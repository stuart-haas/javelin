import Vue from 'vue';
import Table from './Table.vue';
import TableRow from './TableRow.vue';
import TableColumn from './TableColumn.vue';
import TableHeader from './TableHeader.vue';
import resolvePath from 'object-resolve-path';

const resolveColumn = (item, field) => {
  let column = { ...field };
  if (column.tag === 'router-link') {
    column.to = column.to.replace(':param', item[column.param]);
  }
  if (column.tag === 'img') {
    column.src = item[column.src];
  }
  if (column.hideOn) {
    column.hideOn =
      column.hideOn.value === item[column.hideOn.key] && column.hideOn.and;
  }
  return column;
};

const resolveRow = (item, fields, rowOptions) => {
  let row = { ...rowOptions };
  row['original'] = {};
  row['modified'] = {};
  fields.forEach((field) => {
    row.modified[field.key] = resolveValue(item, field);
    row.original[field.key] = field.key
      ? resolvePath(item, field.key)
      : field.value;
  });
  if (row.active) {
    row.active = row.active.value === item[row.active.key];
  }
  return row;
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
    const attrs = resolveColumn(item, field);
    const value = resolveValue(item, field);
    return { value, ...attrs };
  });
};

const TableMixin = {
  methods: {
    mapTableData(data, fields, rowOptions = {}) {
      let rows = [];
      data.map((item) => {
        const columns = mapColumns(item, fields);
        const row = resolveRow(item, fields, rowOptions);
        const merged = { ...row, columns };
        rows.push(merged);
      });
      return rows;
    },
    sortTableData(rows, options) {
      const { key, direction } = options;
      const operators = { asc: '<', desc: '>' };
      const operator = operators[direction];
      return [...rows].sort((a, b) => {
        return eval('a.original[key]' + operator + 'b.original[key] ? 1 : -1');
      });
    },
  },
};

Vue.component('Table', Table);
Vue.component('TableRow', TableRow);
Vue.component('TableColumn', TableColumn);
Vue.component('TableHeader', TableHeader);

Vue.mixin(TableMixin);
