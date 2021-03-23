import Timer from 'tiny-timer';
import {
  humanReadableToTime,
  timeToHumanReadable,
  formatTime,
  timeToSeconds,
  timeToMinutes,
  timeToHours,
} from '../utils/time';

export const timerMixin = {
  data() {
    return {
      timer: null,
      currentTime: 0,
      lastTime: 0,
      running: true,
    };
  },
  computed: {
    duration: {
      get() {
        const { currentTime } = this;
        const hours = timeToHours(currentTime);
        const minutes = timeToMinutes(currentTime);
        const seconds = timeToSeconds(currentTime);

        return timeToHumanReadable([
          formatTime(hours),
          formatTime(minutes),
          formatTime(seconds),
        ]);
      },
      set(newVal) {
        const time = parseInt(humanReadableToTime(newVal));
        this.currentTime = time;
        this.lastTime = time;
      },
    },
  },
  mounted() {
    this.timer = new Timer({ interval: 1000, stopwatch: true });

    this.timer.on('tick', this.update);
  },
  beforeDestroy() {
    this.timer.stop();
  },
  methods: {
    update(currentTime) {
      this.currentTime = parseInt(Math.floor(currentTime + this.lastTime));
    },
    start() {
      this.timer.start(86400000);
      this.running = true;
      localStorage.setItem(this.runningId, true);
    },
    resume() {
      this.timer.resume();
      this.running = true;
      localStorage.setItem(this.runningId, true);
    },
    pause() {
      this.timer.pause();
      this.running = false;
      localStorage.setItem(this.runningId, false);
    },
    stop() {
      this.timer.stop();
      this.running = false;
      localStorage.setItem(this.runningId, false);
    },
    restart() {
      this.stop();
      this.start();
    },
  },
};
