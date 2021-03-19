<template>
  <div class="card mb-5">
    <header v-if="tracker.complete" class="card-header">
      <p class="card-header-title">{{ createdAt }} &vert; {{ duration }}</p>
    </header>
    <div class="card-content">
      <div class="level">
        <div class="level-left">
          <div class="level-item is-clickable">
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
          <div class="level-item ml-6 is-clickable">
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
          <div class="level-item is-clickable ml-4">
            <div class="field">
              <p class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="00:00:00"
                  v-model="calculatedTime"
                  @keydown.enter="handleSetTime"
                  @focus="handleEditTime"
                  @blur="handleSetTime"
                  @keyup.esc="handleCancel('time')"
                />
              </p>
            </div>
          </div>
          <div v-if="!tracker.complete" class="level-item ml-4">
            <span class="icon is-clickable" @click="toggle">
              <Icon v-if="!running" icon="play" />
              <Icon v-else icon="pause" />
            </span>
          </div>
          <div v-if="!tracker.complete" class="level-item ml-4">
            <div class="buttons">
              <div class="button is-primary" @click="handleComplete">Log</div>
            </div>
          </div>
          <div class="level-item ml-4">
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
import { days, months, timeDuration } from '../../../utils/time';

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
      duration: '',
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
    calculatedTime: {
      get() {
        return this.tracker.complete ? this.tracker.time : this.time;
      },
      set(newVal) {
        this.formData.time = newVal;
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
    this.duration = this.getDuration();

    if (localStorage.getItem(this.timeId)) {
      const currentTime = localStorage.getItem(this.timeId);
      this.lastTime = parseInt(currentTime);
    }

    if (localStorage.getItem(this.runningId)) {
      this.running = localStorage.getItem(this.runningId) === 'true';
    }

    this.currentTime = parseInt(Math.floor(this.currentTime + this.lastTime));

    if (this.tracker.complete) {
      this.running = false;
    }

    if (this.running) {
      this.start();
    }
  },
  methods: {
    toggle() {
      this.running ? this.pause() : this.resume();
    },
    handleEditTime() {
      if (!this.tracker.complete) {
        this.pause();
        this.formData.time = this.time;
      }
    },
    handleSetTime() {
      this.time = this.formData.time;

      if (this.tracker.complete) {
        this.formData.time = this.time;
        this.handleSave();
      } else {
        this.resume();
      }
    },
    handleCancel(key) {
      this.formData[key] = this.tracker[key];

      if (key == 'time' && !this.tracker.complete) {
        this.resume();
      }
    },
    async handleComplete() {
      localStorage.removeItem(this.runningId);
      localStorage.removeItem(this.timeId);
      this.formData.time = this.time;
      this.formData.complete = true;
      await this.handleSave();
      this.$emit('complete');
    },
    async handleSave() {
      const param = this.tracker._id;
      const { formData } = this;
      await this.$store.dispatch('tracker/update', {
        formData,
        param,
      });
      this.duration = this.getDuration();
    },
    handleRemove() {
      const param = this.tracker._id;
      if (window.confirm('Are you sure?')) {
        this.$store.dispatch('tracker/remove', {
          param,
        });
      }
    },
    getDuration() {
      return timeDuration(this.tracker.createdAt, this.tracker.time);
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
