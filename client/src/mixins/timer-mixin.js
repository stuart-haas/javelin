import Timer from 'tiny-timer';

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
    time() {
      return (
        this.formattedHours +
        ':' +
        this.formattedMinutes +
        ':' +
        this.formattedSeconds
      );
    },
    formattedSeconds() {
      return this.seconds < 10 ? `0${this.seconds}` : this.seconds;
    },
    formattedMinutes() {
      return this.minutes < 10 ? `0${this.minutes}` : this.minutes;
    },
    formattedHours() {
      return this.hours < 10 ? `0${this.hours}` : this.hours;
    },
    milliseconds() {
      return this.currentTime;
    },
    totalSeconds() {
      return parseInt(Math.floor(this.milliseconds / 1000));
    },
    totalMinutes() {
      return parseInt(Math.floor(this.totalSeconds / 60));
    },
    totalHours() {
      return parseInt(Math.floor(this.totalMinutes / 60));
    },
    seconds() {
      return parseInt(this.totalSeconds % 60);
    },
    minutes() {
      return parseInt(this.totalMinutes % 60);
    },
    hours() {
      return parseInt(this.totalHours % 24);
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
