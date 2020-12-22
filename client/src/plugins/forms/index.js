import Vue from 'vue';
import Form from './Form.vue';
import Upload from './Upload.vue';
import Field from './Field.vue';
import Counter from './Counter.vue';
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
            value = resolveValue(data, field, value.key);
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
    mapFieldItemsData(data, fields, keys) {
      return copyFields(fields).map((field) => {
        if (field.items) {
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

Vue.component('Upload', Upload);
Vue.component('Form', Form);
Vue.component('Field', Field);
Vue.component('Counter', Counter);

Vue.mixin(FormMixin);
