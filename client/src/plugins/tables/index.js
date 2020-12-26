import Vue from 'vue';
import Table from './Table.vue';
import TableRow from './TableRow.vue';
import TableColumn from './TableColumn.vue';
import TableHeader from './TableHeader.vue';
import resolvePath from 'object-resolve-path';

const resolveRow = (item, fields, options) => {
  let row = { ...options };
  row['columns'] = {};
  fields.forEach((el) => {
    const field = {
      ...el,
      sortable: typeof el.sortable !== 'undefined' ? el.sortable : true,
      filterable: typeof el.filterable !== 'undefined' ? el.filterable : true,
    };
    if (field.hidden) {
      field.sortable = false;
      field.filterable = false;
    }
    if (field.tag === 'img') {
      field.src = item[field.src];
      field.sortable = false;
      field.filterable = false;
    }
    if (field.tag === 'router-link') {
      field.to = field.to.replace(':param', item[field.param]);
    }
    if (field.boolQuery) {
      field.boolQuery = eval(field.boolQuery);
    }
    row.columns[field.name] = {
      value: resolveValue(item, field),
      source: resolveValue(item, field, false),
      ...field,
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

const TableMixin = {
  methods: {
    mapTable(data, fields, options = {}) {
      let rows = [];
      data.forEach((item) => {
        const row = resolveRow(item, fields, options);
        rows.push(row);
      });
      return rows;
    },
    sortTable(rows, options) {
      const { orderBy, sort } = options;
      return [...rows].sort((a, b) => {
        if (sort === 'asc') {
          return a.columns[orderBy].value < b.columns[orderBy].value ? 1 : -1;
        } else {
          return a.columns[orderBy].value > b.columns[orderBy].value ? 1 : -1;
        }
      });
    },
    searchTable(rows, search) {
      return [...rows].filter((item) => {
        return (
          Object.values(item.columns).filter((column) => {
            if (!column.filterable) {
              return 0;
            }
            return String(column.value).toLowerCase().indexOf(search) !== -1;
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
