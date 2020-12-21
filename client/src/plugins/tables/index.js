import Vue from 'vue';
import Table from './Table.vue';
import resolvePath from 'object-resolve-path';

const resolveAttributes = (attributes, item) => {
  let attrs = { ...attributes };
  if (attrs.to) {
    attrs.to = attrs.to.replace(':param', item[attrs.param]);
  }
  return attrs;
};

const TableMixin = {
  methods: {
    mapTableData(data, fields) {
      const rows = [];
      data.map((item) => {
        const row = fields.map((field) => {
          const attrs = resolveAttributes(field.attrs, item);
          return {
            label: field.key,
            value: resolvePath(item, field.key),
            tag: field.tag,
            attrs: { ...attrs },
            listeners: { ...field.listeners },
          };
        });
        rows.push(row);
      });
      return rows;
    },
  },
};

Vue.component('Table', Table);

Vue.mixin(TableMixin);
