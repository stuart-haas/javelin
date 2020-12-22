import Vue from 'vue';
import Table from './Table.vue';
import resolvePath from 'object-resolve-path';

const resolveColumnAttributes = (item, field, colAttrs) => {
  let attrs = { ...colAttrs };
  if (field.tag === 'router-link') {
    attrs.to = attrs.to.replace(':param', item[attrs.param]);
  }
  if (field.tag === 'img') {
    attrs.src = item[attrs.src];
  }
  if (field.hiddenIf) {
    attrs.hidden =
      field.hiddenIf.value === item[field.hiddenIf.key] && field.hiddenIf.and;
  }
  return attrs;
};

const resolveRowAttributes = (item, fields, rowAttrs) => {
  let attrs = { ...rowAttrs };
  if (attrs.active) {
    attrs.active = attrs.active.value === item[attrs.active.key];
  }
  return attrs;
};

const resolveValue = (item, field) => {
  return field.key ? resolvePath(item, field.key) : field.value;
};

const TableMixin = {
  methods: {
    mapTableData(data, fields, rowAttrs = {}) {
      const rows = [];
      data.map((item) => {
        let row = fields.map((field) => {
          let { tag = '', hidden = false, hiddenIf = {}, attrs = {} } = field;
          attrs = resolveColumnAttributes(item, field, attrs);
          const value = resolveValue(item, field);
          return {
            tag,
            hidden,
            hiddenIf,
            value,
            attrs: { ...attrs },
          };
        });
        const attrs = resolveRowAttributes(item, fields, rowAttrs);
        Object.assign(row, attrs);
        rows.push(row);
      });
      return rows;
    },
  },
};

Vue.component('Table', Table);

Vue.mixin(TableMixin);
