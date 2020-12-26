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
  if (column.boolQuery) {
    column.boolQuery = eval(column.boolQuery);
  }
  return column;
};

const resolveRow = (item, fields, options) => {
  let row = { ...options };
  row['values'] = {};
  fields.forEach((field) => {
    let { sortable = true, filterable = true, hidden = false } = field;
    if (hidden) {
      sortable = false;
      filterable = false;
    }
    row.values[field.name] = {
      resolved: resolveValue(item, field),
      source: resolveValue(item, field, false),
      hidden,
      sortable,
      filterable,
    };
  });
  if (row.active) {
    row.active = row.active.value === item[row.active.name];
  }
  return row;
};

const resolveValue = (item, field, resolve = true) => {
  const resolvedValue = field.name
    ? resolvePath(item, field.name)
    : field.value;
  if (!resolve) {
    return resolvedValue;
  }
  if (field.format) {
    if (field.format.function) {
      return field.format.function(
        Date.parse(resolvedValue),
        field.format.pattern
      );
    }
    if (field.format.filter) {
      return Vue.filter(field.format.filter)(resolvedValue);
    }
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
    mapTable(data, fields, options = {}) {
      let rows = [];
      data.forEach((item) => {
        const columns = mapColumns(item, fields);
        const row = resolveRow(item, fields, options);
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
            if (!value.filterable) {
              return 0;
            }
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
