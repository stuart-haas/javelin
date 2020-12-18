const Product = require('../models/product.model');

module.exports = {
  slugify: (string) => {
    return string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  },
  formatCurrency: (value) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    return formatter.format(value);
  },
  merge: (a1, a2) => {
    return a1.map((t1) => ({
      ...t1,
      ...a2.find((t2) => String(t2.id) === String(t1._id)),
    }));
  },
};
