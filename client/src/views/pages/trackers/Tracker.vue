<template>
  <div class="card mb-5">
    <header v-if="tracker.complete" class="card-header">
      <p class="card-header-title">{{ createdAt }} &vert; {{ timeRange }}</p>
    </header>
    <div class="card-content">
      <div class="level">
        <div class="level-left">
          <div class="level-item is-clickable">
            <div class="field">
              <p class="control">
                <input
                  ref="name"
                  type="text"
                  class="input"
                  v-model="formData.name"
                  placeholder="Name"
                  @keydown.enter="handleUpdate('name')"
                  @keyup.esc="handleCancel('name')"
                  @blur="handleUpdate('name')"
                  @keydown.tab.prevent="handleNext('name', 'project')"
                />
              </p>
            </div>
          </div>
          <div class="level-item ml-6 is-clickable">
            <div class="field">
              <p class="control">
                <input
                  ref="project"
                  type="text"
                  class="input"
                  v-model="formData.project"
                  :placeholder="tracker.project"
                  @keydown.enter="handleUpdate('project')"
                  @keyup.esc="handleCancel('project')"
                  @blur="handleUpdate('project')"
                  @keydown.tab.prevent="handleNext('project', 'time')"
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
                  ref="time"
                  type="text"
                  class="input"
                  placeholder="00:00:00"
                  v-model="calculatedTime"
                  @keydown.enter="handleSetTime"
                  @keyup.esc="handleCancel('time')"
                  @click.stop="handleEdit('time')"
                  @blur="handleCancel('time')"
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
import {
  days,
  months,
  timeToHumanReadable,
  humanReadableValue,
  formatTime,
} from '../../../utils/time';

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
      edit: {
        name: false,
        time: false,
        project: false,
        rate: false,
      },
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
    timeRange() {
      const start = new Date(this.tracker.createdAt);

      const startHours = start.getHours();
      const startMinutes = start.getMinutes();

      const endHours = this.tracker.time
        ? Number(humanReadableValue(this.tracker.time, 0))
        : 0;

      const endMinutes = this.tracker.time
        ? Number(humanReadableValue(this.tracker.time, 1))
        : 0;

      var diffDate = new Date(start);
      diffDate.setHours(diffDate.getHours() + endHours);
      diffDate.setMinutes(diffDate.getMinutes() + endMinutes);

      return (
        timeToHumanReadable([
          formatTime(startHours),
          formatTime(startMinutes),
        ]) +
        '-' +
        timeToHumanReadable([
          formatTime(diffDate.getHours()),
          formatTime(diffDate.getMinutes()),
        ])
      );
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
    handleNext(current, next) {
      this.handleCancel(current);
      this.handleEdit(next);
    },
    handleEdit(key) {
      this.edit[key] = true;
      if (key === 'time' && !this.tracker.complete) {
        this.pause();
        this.formData.time = this.time;
      }
      this.$nextTick(() => {
        this.$refs[key].focus();
      });
    },
    handleCancel(key) {
      this.edit[key] = false;
      this.formData[key] = this.tracker[key];

      if (key == 'time' && !this.tracker.complete) {
        this.resume();
      }
    },
    handleSetTime() {
      this.time = this.formData.time;
      this.edit.time = false;

      if (this.tracker.complete) {
        this.formData.time = this.time;
        this.handleUpdate('time');
      } else {
        this.resume();
      }
    },
    handleUpdate(key) {
      this.handleSave();
      this.edit[key] = false;
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
