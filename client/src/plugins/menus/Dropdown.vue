<template>
  <div v-click-outside="close" class="relative">
    <div
      class="flex items-center text-gray-600 cursor-pointer p-2 bg-gray-200 rounded shadow text-sm transition duration-300 hover:bg-gray-300"
      @click="open = !open"
    >
      <span>{{ title }}</span
      ><Icon
        icon="angle-down"
        class="ml-1 text-lg transform duration-300 transition-all"
        :class="open ? 'rotate-180' : ''"
      />
    </div>
    <transition name="fade">
      <div
        v-if="open"
        class="absolute top-full mt-1 whitespace-nowrap text-sm z-10 right-0"
      >
        <div class="bg-gray-200 rounded shadow text-gray-600 overflow-hidden">
          <DropdownItem
            v-for="(item, index) in items"
            :key="index"
            :item="item"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import DropdownItem from './DropdownItem.vue';
import ClickOutside from 'vue-click-outside';

export default {
  directives: {
    ClickOutside,
  },
  components: {
    DropdownItem,
  },
  props: {
    title: {
      type: String,
      default: 'Actions',
    },
    items: Array,
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    tag() {
      return this.item.tag || 'div';
    },
  },
  methods: {
    close() {
      this.open = false;
    },
  },
};
</script>
