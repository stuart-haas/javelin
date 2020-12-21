import Vue from 'vue';
import Table from './Table.vue';
import resolvePath from 'object-resolve-path';

const resolveColumnAttributes = (attributes, item) => {
  let attrs = { ...attributes };
  if (attrs.to) {
    attrs.to = attrs.to.replace(':param', item[attrs.param]);
  }
  return attrs;
};

const resolveRowAttributes = (attributes, item) => {
  let attrs = { ...attributes };
  if (attrs.active) {
    attrs.activeIndex = attrs.active.value === item[attrs.active.key];
  }
  return attrs;
};

const TableMixin = {
  methods: {
    mapTableData(data, fields, attributes = {}) {
      const rows = [];
      data.map((item) => {
        let row = fields.map((field) => {
          const attrs = resolveColumnAttributes(field.attrs, item);
          return {
            label: field.key,
            value: resolvePath(item, field.key),
            tag: field.tag,
            attrs: { ...attrs },
            listeners: { ...field.listeners },
          };
        });
        const attrs = resolveRowAttributes(attributes, item);
        Object.assign(row, attrs);
        rows.push(row);
      });
      return rows;
    },
  },
};

Vue.component('Table', Table);

Vue.mixin(TableMixin);
