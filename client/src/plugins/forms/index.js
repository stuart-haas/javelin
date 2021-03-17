import Vue from 'vue';
import Form from './Form.vue';
import Field from './Field.vue';
import resolvePath from 'object-resolve-path';

const copyFields = (fields) => {
  return [...fields].map((field) => Object.assign({}, field));
};

const resolveValue = (data, field, value) => {
  const val = resolvePath(data, value);
  if (val) {
    if (field.format) {
      return field.format.function(Date.parse(val), field.format.pattern);
    }
  }
  return val;
};

const FormMixin = {
  methods: {
    mapFieldData(data, fields) {
      const fieldData = copyFields(fields).map((field) => {
        let { name, value } = field;
        if (value) {
          // Resolve field value by the field value key
          if (typeof value === 'object') {
            value = resolveValue(data, field, value.name);
          }
          Object.assign(field, { value });
        } else {
          // Resolve field value by the field name
          const value = resolveValue(data, field, name);
          Object.assign(field, { value });
        }
        return field;
      });
      return fieldData;
    },
    mapFieldItemsData(data, fields, key, keys) {
      return copyFields(fields).map((field) => {
        if (field.key === key && field.items) {
          field.items = data.map((item) => {
            item.label = item[keys.label];
            item.value = item[keys.value];
            return item;
          });
        }
        return field;
      });
    },
  },
};

Vue.component('Form', Form);
Vue.component('Field', Field);

Vue.mixin(FormMixin);
