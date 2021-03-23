<template>
  <div class="card mb-5">
    <header v-if="tracker.complete" class="card-header">
      <p class="card-header-title">{{ date }}</p>
    </header>
    <div class="card-content">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <Field
              :value="formData.name"
              name="name"
              placeholder="Name"
              @save="handleSave"
            />
          </div>
          <div class="level-item">
            <Field
              :value="formData.project"
              name="project"
              placeholder="Project"
              @save="handleSave"
            />
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <Field
              :value="formData.rate"
              name="rate"
              placeholder="Rate"
              @save="handleSave"
            />
          </div>
          <div class="level-item">
            <Field
              :value="durationDisplay"
              name="time"
              placeholder="Time"
              @focus="handleEditDuration"
              @save="handleSetDuration"
            />
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
          <div v-if="tracker.complete" class="level-item">
            &#36;{{ tracker.total }}
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
import { timerMixin } from '../../../mixins/timer-mixin';
import { days, humanReadableToTime, months } from '../../../utils/time';
import Field from './Field';

export default {
  mixins: [timerMixin],
  components: {
    Field,
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
    date() {
      const date = new Date(this.formData.createdAt);
      const dayName = days[date.getDay()];
      const monthName = months[date.getMonth()];
      return `${dayName}, ${monthName} ${date.getDay()}`;
    },
    durationDisplay: {
      get() {
        return this.duration;
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
      this.duration = this.tracker.durationDisplay;
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
        this.pause();
        this.formData.duration = this.duration;
      }
    },
    handleSetDuration(options, callback) {
      const { model } = options;
      this.duration = model;

      if (this.tracker.complete) {
        this.handleSave(options, callback);
      } else {
        this.restart();
      }
    },
    async handleComplete() {
      localStorage.removeItem(this.runningId);
      localStorage.removeItem(this.timeId);

      this.formData.complete = true;

      await this.handleSave();
    },
    async handleSave(options, callback) {
      if (options) {
        const { name, model } = options;
        this.formData[name] = model;
      }
      this.formData.duration = humanReadableToTime(this.duration);

      const { formData } = this;
      const param = this.tracker._id;
      const response = await this.$store.dispatch('tracker/update', {
        formData,
        param,
      });
      if (callback) {
        callback();
      }
      return response;
    },
    async handleRemove() {
      const param = this.tracker._id;
      if (window.confirm('Are you sure?')) {
        const { message } = await this.$store.dispatch('tracker/remove', {
          param,
        });
        this.$toast({ type: 'success', message, duration: 2000 });
      }
    },
  },
};
</script>
