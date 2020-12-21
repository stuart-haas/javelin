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

const resolveRowAttributes = (row, rowAttributes, item) => {
  if (rowAttributes.active) {
    row.active = rowAttributes.active.value === item[rowAttributes.active.key];
  }
  return row;
};

const TableMixin = {
  methods: {
    mapTableData(data, fields, rowAttributes) {
      const rows = [];
      data.map((item) => {
        const row = fields.map((field) => {
          const attrs = resolveColumnAttributes(field.attrs, item);
          return {
            label: field.key,
            value: resolvePath(item, field.key),
            tag: field.tag,
            attrs: { ...attrs },
            listeners: { ...field.listeners },
          };
        });
        if (rowAttributes) {
          resolveRowAttributes(row, rowAttributes, item);
        }
        rows.push(row);
      });
      return rows;
    },
  },
};

Vue.component('Table', Table);

Vue.mixin(TableMixin);
