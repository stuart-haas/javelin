import Vue from 'vue';
import Table from './Table.vue';
import resolvePath from 'object-resolve-path';

const resolveAttributes = (attributes, item, extras) => {
  let attrs = { ...attributes };
  if (attrs.to) {
    attrs.to = attrs.to.replace(':param', item[attrs.param]);
  }
  if (extras.active) {
    attrs.active = extras.active.value === item[extras.active.key];
  }
  return attrs;
};

const TableMixin = {
  methods: {
    mapTableData(data, fields, extras) {
      const rows = [];
      data.map((item) => {
        const row = fields.map((field) => {
          const attrs = resolveAttributes(field.attrs, item, extras);
          return {
            label: field.key,
            value: resolvePath(item, field.key),
            tag: field.tag,
            attrs: { ...attrs },
            listeners: { ...field.listeners },
          };
        });
        row.active = extras.active.value === item[extras.active.key];
        rows.push(row);
      });
      return rows;
    },
  },
};

Vue.component('Table', Table);

Vue.mixin(TableMixin);
