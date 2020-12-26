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
  row['values'] = {};
  fields.forEach((field) => {
    row.values[field.key] = {
      resolved: resolveValue(item, field),
      source: resolveValue(item, field, false),
    };
  });
  if (row.active) {
    row.active = row.active.value === item[row.active.key];
  }
  return row;
};

const resolveValue = (item, field, resolve = true) => {
  const resolvedValue = field.key ? resolvePath(item, field.key) : field.value;
  if (!resolve) {
    return resolvedValue;
  }
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
    mapTable(data, fields, rowOptions = {}) {
      let rows = [];
      data.map((item) => {
        const columns = mapColumns(item, fields);
        const row = resolveRow(item, fields, rowOptions);
        const merged = { ...row, columns };
        rows.push(merged);
      });
      return rows;
    },
    sortTable(rows, options) {
      const { key, direction } = options;
      return [...rows].sort((a, b) => {
        if (direction === 'asc') {
          return a.values[key].source < b.values[key].source ? 1 : -1;
        } else {
          return a.values[key].source > b.values[key].source ? 1 : -1;
        }
      });
    },
    searchTable(rows, search) {
      return [...rows].filter((item) => {
        return (
          Object.values(item.values).filter((value) => {
            return String(value.resolved).toLowerCase().indexOf(search) !== -1;
          }).length > 0
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
