import Vue from 'vue';
import pluralize from 'pluralize';
import { format } from 'date-fns';

Vue.filter('currency', function (value) {
  if (typeof value !== 'number') {
    return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formatter.format(value);
});

Vue.filter('date', function (value) {
  return format(Date.parse(value), 'MMMM d, yyyy');
});

Vue.filter('time', function (value) {
  return format(Date.parse(value), 'h:mm a');
});

Vue.filter('pluralize', function (value, number) {
  return pluralize(value, number);
});
