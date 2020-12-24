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
  if (field.hideOn) {
    attrs.hidden =
      field.hideOn.value === item[field.hideOn.key] && field.hideOn.and;
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
  const val = field.key ? resolvePath(item, field.key) : field.value;
  if (field.format) {
    return field.format.function(Date.parse(val), field.format.pattern);
  }
  if (field.concat) {
    return field.concat.keys
      .map((key, index) => {
        if (field.concat.filters) {
          return Vue.filter(field.concat.filters[index])(
            resolvePath(item, key)
          );
        }
        return resolvePath(item, key);
      })
      .join(field.concat.join);
  }
  if (field.filter) {
    return Vue.filter(field.filter)(val);
  }
  return val;
};

const TableMixin = {
  methods: {
    mapTableData(data, fields, rowAttrs = {}) {
      const rows = [];
      data.map((item) => {
        let row = fields.map((field) => {
          let { tag = '', hidden = false, hideOn = {}, attrs = {} } = field;
          attrs = resolveColumnAttributes(item, field, attrs);
          const value = resolveValue(item, field);
          return {
            tag,
            hidden,
            hideOn,
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
