import Vue from 'vue';
import Table from './Table.vue';
import resolvePath from 'object-resolve-path';

const resolveColumnAttributes = (attributes, item) => {
  let attrs = { ...attributes };
  if (attrs.to) {
    attrs.to = attrs.to.replace(':param', item[attrs.param]);
  }
  if (attrs.src) {
    attrs.src = item[attrs.src];
  }
  if (attrs.disable) {
    attrs.disable = attrs.disable.value === item[attrs.disable.key];
  }
  return attrs;
};

const resolveRowAttributes = (attributes, item) => {
  let attrs = { ...attributes };
  if (attrs.active) {
    attrs.active = attrs.active.value === item[attrs.active.key];
  }
  if (attrs.disable) {
    attrs.disable = attrs.disable.value === item[attrs.disable.key];
  }
  return attrs;
};

const resolveValue = (item, field) => {
  return field.key ? resolvePath(item, field.key) : field.value;
};

const TableMixin = {
  methods: {
    mapTableData(data, fields, attributes = {}) {
      const rows = [];
      data.map((item) => {
        let row = fields.map((field) => {
          let { label = '', tag = '', attrs = {}, listeners = {} } = field;
          attrs = resolveColumnAttributes(attrs, item);
          const value = resolveValue(item, field);
          const { disable = false } = attrs;
          return {
            label,
            tag,
            value,
            disable,
            attrs: { ...attrs },
            listeners: { ...listeners },
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
