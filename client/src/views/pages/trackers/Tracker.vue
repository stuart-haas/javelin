<template>
  <div class="card mb-5">
    <header class="card-header">
      <p class="card-header-title">
        {{ date }} {{ tracker.complete && `&vert; ${timeRange}` }}
      </p>
    </header>
    <div class="card-content">
      <div class="level">
        <div class="level-left">
          <div class="level-item is-clickable" @click.stop="handleEdit('name')">
            <div>
              <p class="is-size-7 has-text-weight-bold">Name</p>
              <span v-show="!edit['name']">{{ tracker.name }}</span>
              <div v-show="edit['name']" class="field">
                <p class="control">
                  <input
                    ref="name"
                    type="text"
                    class="input"
                    v-model="formData.name"
                    :placeholder="tracker.name"
                    @keydown.enter="handleUpdate('name')"
                    @keyup.esc="handleCancel('name')"
                    @blur="handleUpdate('name')"
                    @keydown.tab.prevent="handleNext('name', 'project')"
                  />
                </p>
              </div>
            </div>
          </div>
          <div
            class="level-item ml-6 is-clickable"
            @click.stop="handleEdit('project')"
          >
            <div>
              <p class="is-size-7 has-text-weight-bold">Project</p>
              <span v-show="!edit['project']">{{ tracker.project }}</span>
              <div v-show="edit['project']" class="field">
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
                    @keydown.tab.prevent="handleNext('project', 'rate')"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item is-clickable" @click.stop="handleEdit('rate')">
            <div>
              <p class="is-size-7 has-text-weight-bold">Rate</p>
              <span v-show="!edit['rate']">{{ tracker.rate }}</span>
              <div v-show="edit['rate']" class="field">
                <p class="control">
                  <input
                    ref="rate"
                    type="text"
                    class="input"
                    v-model="formData.rate"
                    :placeholder="tracker.rate"
                    @keydown.enter="handleUpdate('rate')"
                    @keyup.esc="handleCancel('rate')"
                    @blur="handleUpdate('rate')"
                    @keydown.tab.prevent="handleNext('rate', 'time')"
                  />
                </p>
              </div>
            </div>
          </div>
          <div
            class="level-item is-clickable ml-4"
            @click.stop="handleEdit('time')"
          >
            <span v-show="!edit['time'] && !tracker.complete">{{ time }}</span>
            <span v-show="!edit['time'] && tracker.complete">{{
              formData.time
            }}</span>
            <div v-show="edit['time']" class="field">
              <p class="control">
                <input
                  ref="time"
                  type="text"
                  class="input"
                  placeholder="00:00:00"
                  v-model="formData.time"
                  @keydown.enter="handleSetTime"
                  @keyup.esc="handleCancel('time')"
                  @blur="handleCancel('time')"
                />
              </p>
            </div>
          </div>
          <div v-if="!tracker.complete" class="level-item ml-4">
            <span class="icon is-clickable">
              <Icon v-if="!running" icon="play" @click="resume" />
              <Icon v-else icon="pause" @click="pause" />
            </span>
          </div>
          <div v-if="!tracker.complete" class="level-item ml-4">
            <div class="buttons">
              <div class="button is-primary" @click="handleComplete">Log</div>
            </div>
          </div>
          <div v-if="tracker.complete" class="level-item ml-4">
            <span>{{ total }}</span>
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
import * as timeago from 'timeago.js';

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
    date() {
      return timeago.format(this.formData.createdAt);
    },
    timeId() {
      return `${this.tracker._id}-time`;
    },
    runningId() {
      return `${this.tracker._id}-running`;
    },
    total() {
      return `$${this.formData.rate * this.timeAsHours}`;
    },
    timeRange() {
      const start = new Date(this.formData.createdAt);
      const startHours =
        start.getHours() < 10 ? `0${start.getHours()}` : start.getHours();
      const startMinutes =
        start.getMinutes() < 10 ? `0${start.getMinutes()}` : start.getMinutes();

      const endHours = Number(
        this.formData.time && this.formData.time.split(':')[0]
      );
      const endMinutes = Number(
        this.formData.time && this.formData.time.split(':')[1]
      );

      const diffHours = Math.abs(endHours + Number(start.getHours()));
      const diffMinutes = Math.abs(endMinutes + Number(start.getMinutes()));

      const finalEndHours = diffHours < 10 ? `0${diffHours}` : diffHours;
      const finalEndMinutes =
        diffMinutes < 10 ? `0${diffMinutes}` : diffMinutes;

      return (
        startHours +
        ':' +
        startMinutes +
        '-' +
        finalEndHours +
        ':' +
        finalEndMinutes
      );
    },
    timeAsHours() {
      const milliseconds =
        Number(this.formData.time && this.formData.time.split(':')[0]) *
          60000 *
          60 +
        Number(this.formData.time && this.formData.time.split(':')[1]) * 60000 +
        Number(this.formData.time && this.formData.time.split(':')[2]) * 1000;

      return Math.ceil((milliseconds / (1000 * 60 * 60)) % 60);
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
