import Vue from 'vue';
import pluralize from 'pluralize';

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

Vue.filter('pluralize', function (value, number) {
  return pluralize(value, number);
});
