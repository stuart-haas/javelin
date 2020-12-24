import Vue from 'vue';
import Table from './Table.vue';
import TableRow from './TableRow.vue';
import TableColumn from './TableColumn.vue';
import TableHeader from './TableHeader.vue';
import resolvePath from 'object-resolve-path';

const resolveColumns = (item, field) => {
  let attrs = { ...field };
  if (attrs.tag === 'router-link') {
    attrs.to = attrs.to.replace(':param', item[attrs.param]);
  }
  if (attrs.tag === 'img') {
    attrs.src = item[attrs.src];
  }
  if (attrs.hideOn) {
    attrs.hideOn =
      attrs.hideOn.value === item[attrs.hideOn.key] && attrs.hideOn.and;
  }
  return attrs;
};

const resolveRows = (item, fields, rowConfig) => {
  let config = { ...rowConfig };
  config['original'] = {};
  config['modified'] = {};
  fields.forEach((field) => {
    config.modified[field.key] = resolveValue(item, field);
    config.original[field.key] = field.key
      ? resolvePath(item, field.key)
      : field.value;
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
    const attrs = resolveColumns(item, field);
    const value = resolveValue(item, field);
    return {
      value,
      field: { ...attrs },
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
      console.log(rows);
      return rows;
    },
    sortTableData(rows, options) {
      const { key, direction } = options;
      const operators = { asc: '<', desc: '>' };
      const operator = operators[direction];
      return [...rows].sort((a, b) => {
        return eval(
          'a.rowData.original[key]' +
            operator +
            'b.rowData.original[key] ? 1 : -1'
        );
      });
    },
  },
};

Vue.component('Table', Table);
Vue.component('TableRow', TableRow);
Vue.component('TableColumn', TableColumn);
Vue.component('TableHeader', TableHeader);

Vue.mixin(TableMixin);
