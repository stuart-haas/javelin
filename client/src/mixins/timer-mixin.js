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
    time: {
      get() {
        return timeToHumanReadable([
          formatTime(this.hours),
          formatTime(this.minutes),
          formatTime(this.seconds),
        ]);
      },
      set(newVal) {
        const time = parseInt(humanReadableToTime(newVal));
        this.currentTime = time;
        this.lastTime = time;
      },
    },
    seconds() {
      return timeToSeconds(this.currentTime);
    },
    minutes() {
      return timeToMinutes(this.currentTime);
    },
    hours() {
      return timeToHours(this.currentTime);
    },
  },
  mounted() {
    this.timer = new Timer({ interval: 1000, stopwatch: true });

    this.timer.on('tick', (currentTime) => {
      this.currentTime = parseInt(Math.floor(currentTime + this.lastTime));
    });
  },
  methods: {
    start() {
      this.timer.start(86400000);
    },
    resume() {
      this.timer.resume();
      this.start();
      this.running = true;
      localStorage.setItem(this.runningId, true);
    },
    pause() {
      this.timer.pause();
      this.running = false;
      localStorage.setItem(this.runningId, false);
    },
  },
};
