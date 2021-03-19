const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

module.exports = {
  formatTime(value) {
    return value < 10 ? `0${value}` : value;
  },
  timeToHumanReadable(values) {
    return values.length && values.join(':');
  },
  humanReadableToTime(value) {
    if (isNaN(value)) {
      const hours = humanReadableValue(value, 0);
      const minutes = humanReadableValue(value, 1);
      const seconds = humanReadableValue(value, 2);
      return hoursToTime(hours) + minutesToTime(minutes) + secondsToTime(seconds);
    }
    return Number(value);
  },
  humanReadableToHours(value) {
    return humanReadableToTime(value) / (1000 * 60 * 60);
  },
  hoursToTime(value) {
    return Number(value) * 60000 * 60;
  },
  minutesToTime(value) {
    return Number(value) * 60000;
  },
  secondsToTime(value) {
    return Number(value) * 1000;
  },
  humanReadableValue(value, index, split = ':') {
    return value && value.split(split)[index];
  },
  timeToSeconds(value) {
    return parseInt(Math.floor(value / 1000) % 60);
  },
  timeToMinutes(value) {
    return parseInt(Math.floor((value / (1000 * 60)) % 60));
  },
  timeToHours(value) {
    return parseInt(Math.floor((value / (1000 * 60 * 60)) % 24));
  },
  timeDuration(start, end) {
    const startDate = new Date(start);
  
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();
  
    const endHours = end ? Number(humanReadableValue(end, 0)) : 0;
  
    const endMinutes = end ? Number(humanReadableValue(end, 1)) : 0;
  
    var diffDate = new Date(startDate);
    diffDate.setHours(diffDate.getHours() + endHours);
    diffDate.setMinutes(diffDate.getMinutes() + endMinutes);
  
    return (
      timeToHumanReadable([formatTime(startHours), formatTime(startMinutes)]) +
      '-' +
      timeToHumanReadable([
        formatTime(diffDate.getHours()),
        formatTime(diffDate.getMinutes()),
      ])
    );
  }
}