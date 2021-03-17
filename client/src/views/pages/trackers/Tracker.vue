<template>
  <div class="box">
    <div class="level">
      <div class="level-left">
        <div class="level-item" v-click-outside="() => handleCancel('name')">
          <span
            v-show="!edit['name']"
            class="is-clickable"
            @click.stop="handleEdit('name')"
            >{{ tracker.name }}</span
          >
          <div v-show="edit['name']" class="field">
            <p class="control">
              <input
                ref="name"
                type="text"
                class="input"
                v-model="formData.name"
                :placeholder="tracker.name"
                @keydown.enter="handleUpdate('name')"
                @keydown.esc="handleCancel('name')"
              />
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item" v-click-outside="() => handleCancel('time')">
          <span
            v-show="!edit['time']"
            class="is-clickable"
            @click.stop="handleEdit('time')"
            >{{ time }}</span
          >
          <div v-show="edit['time']" class="field">
            <p class="control">
              <input
                ref="time"
                type="text"
                class="input"
                placeholder="00:00:00"
                v-model="formData.time"
                @keydown.enter="handleSetTime"
                @keydown.esc="handleCancel('time')"
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
        <div class="level-item ml-4">
          <button
            class="delete has-background-danger"
            @click="handleRemove"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { timerMixin } from '../../../mixins/timer-mixin';

export default {
  mixins: [timerMixin],
  directives: {
    ClickOutside,
  },
  props: {
    tracker: Object,
    index: Number,
  },
  data() {
    return {
      edit: {
        name: false,
        time: false,
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

    if (this.running && !this.tracker.complete) {
      this.start();
    }
  },
  methods: {
    handleEdit(key) {
      this.edit[key] = true;
      if (key === 'time') {
        this.formData.time = this.time;
        this.pause();
      }
      this.$nextTick(() => {
        this.$refs[key].focus();
      });
    },
    handleCancel(key) {
      this.edit[key] = false;
      this.formData[key] = this.tracker[key];

      if (key == 'time') {
        this.resume();
      }
    },
    handleSetTime() {
      this.time = this.formData.time;
      this.edit.time = false;
      this.resume();

      if (this.tracker.complete) {
        this.handleUpdate('time');
      }
    },
    handleUpdate(key) {
      this.handleSave();
      this.edit[key] = false;
    },
    async handleComplete() {
      this.formData.complete = true;
      await this.handleSave();
      this.$emit('complete');
    },
    async handleSave() {
      const param = this.tracker._id;
      const { formData } = this;
      formData.complete = true;
      await this.$store.dispatch('tracker/update', {
        formData,
        param,
      });
    },
    handleRemove() {
      const param = this.tracker._id;
      const { index } = this;
      if (window.confirm('Are you sure?')) {
        this.$store.dispatch('tracker/remove', {
          param,
          index,
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
