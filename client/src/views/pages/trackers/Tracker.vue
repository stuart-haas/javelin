<template>
  <div class="card mb-5">
    <header v-if="tracker.complete" class="card-header">
      <p class="card-header-title">{{ createdAt }}</p>
    </header>
    <div class="card-content">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="field">
              <p class="control">
                <input
                  type="text"
                  class="input"
                  v-model="formData.name"
                  placeholder="Name"
                  @keydown.enter="handleSave"
                  @blur="handleSave"
                  @keyup.esc="handleCancel('name')"
                />
              </p>
            </div>
          </div>
          <div class="level-item">
            <div class="field">
              <p class="control">
                <input
                  type="text"
                  class="input"
                  v-model="formData.project"
                  placeholder="Project"
                  @keydown.enter="handleSave"
                  @blur="handleSave"
                  @keyup.esc="handleCancel('project')"
                />
              </p>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="field">
              <p class="control">
                <input
                  type="text"
                  class="input"
                  v-model="formData.rate"
                  placeholder="Rate"
                  @keydown.enter="handleSave"
                  @blur="handleSave"
                  @keyup.esc="handleCancel('rate')"
                />
              </p>
            </div>
          </div>
          <div class="level-item">
            <div class="field">
              <p class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="00:00:00"
                  v-model="durationDisplay"
                  @keydown.enter="handleSetDuration"
                  @focus="handleEditDuration"
                  @blur="handleSetDuration"
                  @keyup.esc="handleCancel('duration')"
                />
              </p>
            </div>
          </div>
          <div v-if="!tracker.complete" class="level-item">
            <span class="icon is-clickable" @click="toggle">
              <Icon v-if="!running" icon="play" />
              <Icon v-else icon="pause" />
            </span>
          </div>
          <div v-if="!tracker.complete" class="level-item">
            <div class="buttons">
              <div class="button is-primary" @click="handleComplete">Log</div>
            </div>
          </div>
          <div class="level-item">
            <button
              class="delete has-background-danger"
              @click="handleRemove"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { timerMixin } from '../../../mixins/timer-mixin';
import { days, humanReadableToTime, months } from '../../../utils/time';

export default {
  mixins: [timerMixin],
  directives: {
    ClickOutside,
  },
  props: {
    tracker: Object,
  },
  data() {
    return {
      formData: {},
    };
  },
  computed: {
    timeId() {
      return `${this.tracker._id}-time`;
    },
    runningId() {
      return `${this.tracker._id}-running`;
    },
    createdAt() {
      const date = new Date(this.formData.createdAt);
      const dayName = days[date.getDay()];
      const monthName = months[date.getMonth()];
      return `${dayName}, ${monthName} ${date.getDay()}`;
    },
    durationDisplay: {
      get() {
        return this.tracker.complete
          ? this.tracker.durationDisplay
          : this.duration;
      },
      set(newVal) {
        this.formData.duration = newVal;
      },
    },
  },
  watch: {
    currentTime(newVal, oldVal) {
      localStorage.setItem(this.timeId, newVal);
    },
  },
  mounted() {
    this.formData = this.tracker;

    this.applyLocalStorage();

    if (this.tracker.complete) {
      return (this.running = false);
    }

    this.start();
  },
  methods: {
    applyLocalStorage() {
      if (localStorage.getItem(this.timeId)) {
        const currentTime = localStorage.getItem(this.timeId);
        this.lastTime = parseInt(currentTime);
      }

      if (localStorage.getItem(this.runningId)) {
        this.running = localStorage.getItem(this.runningId) === 'true';
      }

      this.currentTime = parseInt(Math.floor(this.currentTime + this.lastTime));
    },
    toggle() {
      this.running ? this.pause() : this.resume();
    },
    handleEditDuration() {
      if (!this.tracker.complete) {
        this.formData.duration = this.duration;
        this.pause();
      }
    },
    handleSetDuration() {
      this.duration = this.formData.duration;

      if (this.tracker.complete) {
        this.handleSave();
      } else {
        this.resume();
      }
    },
    handleCancel(key) {
      this.formData[key] = this.tracker[key];
      if (key == 'duration' && !this.tracker.complete) {
        this.resume();
      }
    },
    async handleComplete() {
      localStorage.removeItem(this.runningId);
      localStorage.removeItem(this.timeId);
      this.formData.duration = humanReadableToTime(this.duration);
      this.formData.complete = true;
      await this.handleSave();
      this.$emit('complete');
    },
    async handleSave() {
      const param = this.tracker._id;
      this.formData.duration = humanReadableToTime(this.formData.duration);
      const { formData } = this;
      await this.$store.dispatch('tracker/update', {
        formData,
        param,
      });
    },
    handleRemove() {
      const param = this.tracker._id;
      if (window.confirm('Are you sure?')) {
        this.$store.dispatch('tracker/remove', {
          param,
        });
      }
    },
  },
};
</script>

<style scoped>
.icon.check {
  cursor: pointer;
  pointer-events: all;
}
.icon.check svg path {
  fill: hsl(171, 100%, 41%);
}
</style>
