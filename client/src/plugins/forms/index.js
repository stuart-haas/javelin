import Vue from 'vue';
import Form from './Form.vue';
import Upload from './Upload.vue';
import Field from './Field.vue';
import Counter from './Counter.vue';

const FormMixin = {
  methods: {
    mapFieldData(data, fields) {
      const fieldsCopy = [...fields].map((field) => Object.assign({}, field));
      const fieldData = fieldsCopy.map((item) => {
        let value = data[item.name];
        return Object.assign(item, { value });
      });
      return fieldData;
    },
    mapFieldItemsData(data, fields, keys) {
      const fieldsCopy = [...fields].map((field) => Object.assign({}, field));
      const itemsData = fieldsCopy.map((item) => {
        if (item.items) {
          item.items = data.map((item) => {
            item.label = item[keys.label];
            item.value = item[keys.value];
            return item;
          });
        }
        return item;
      });
      return itemsData;
    },
  },
};

Vue.component('Upload', Upload);
Vue.component('Form', Form);
Vue.component('Field', Field);
Vue.component('Counter', Counter);

Vue.mixin(FormMixin);
