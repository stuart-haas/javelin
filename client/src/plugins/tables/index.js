import Vue from 'vue';
import Table from './Table.vue';
import resolvePath from 'object-resolve-path';

const resolveColumns = (item, field, colConfig) => {
  let config = { ...colConfig };
  if (field.tag === 'router-link') {
    config.to = config.to.replace(':param', item[config.param]);
  }
  if (field.tag === 'img') {
    config.src = item[config.src];
  }
  if (field.hideOn) {
    config.hidden =
      field.hideOn.value === item[field.hideOn.key] && field.hideOn.and;
  }
  return config;
};

const resolveRows = (item, fields, rowConfig) => {
  let config = { ...rowConfig };
  fields.forEach((field) => {
    config[field.key] = resolveValue(item, field);
  });
  if (config.active) {
    config.active = config.active.value === item[config.active.key];
  }
  return config;
};

const resolveValue = (item, field) => {
  const resolvedValue = field.key ? resolvePath(item, field.key) : field.value;
  if (field.format) {
    return field.format.function(
      Date.parse(resolvedValue),
      field.format.pattern
    );
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
    return Vue.filter(field.filter)(resolvedValue);
  }
  return resolvedValue;
};

const mapColumns = (item, fields) => {
  return fields.map((field) => {
    let { tag = '', hidden = false, hideOn = {}, attrs = {} } = field;
    attrs = resolveColumns(item, field, attrs);
    const value = resolveValue(item, field);
    return {
      tag,
      hidden,
      hideOn,
      value,
      attrs: { ...attrs },
    };
  });
};

const TableMixin = {
  methods: {
    mapTableData(data, fields, rowConfig = {}) {
      let rows = [];
      data.map((item) => {
        const colData = mapColumns(item, fields);
        const rowData = resolveRows(item, fields, rowConfig);
        rows.push({ rowData, colData });
      });
      return rows;
    },
    sortTableData(rows, options) {},
  },
};

Vue.component('Table', Table);

Vue.mixin(TableMixin);
