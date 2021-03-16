<template>
  <div
    class="relative border border-gray-300 text-gray-600 cursor-pointer p-2 text-sm transition duration-300 rounded"
    @click="open = !open"
    v-click-outside="handleClose"
  >
    <div class="flex items-center">
      <span v-if="hasTitle"><slot name="title" /></span
      ><span v-else>{{ title }}</span><Icon
        icon="angle-down"
        class="ml-4 text-lg transform duration-300 transition-all"
        :class="open ? 'rotate-180' : ''"
      />
    </div>
    <transition name="fade">
      <div
        v-if="open"
        class="absolute w-full top-full mt-1 whitespace-nowrap text-sm z-10 border border-gray-300 rounded shadow"
        :class="[`${hAlign}-0`]"
      >
        <div class="bg-gray-200 rounded shadow text-gray-600 overflow-hidden">
          <DropdownItem
            v-for="(item, index) in items"
            :key="index"
            :item="item"
            :data="data"
            @action="handleAction"
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
    hAlign: {
      type: String,
      default: 'right',
    },
    items: Array,
    data: {
      type: Object,
      default() {
        return {};
      },
    },
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
    hasTitle() {
      return !!this.$slots.title;
    },
  },
  methods: {
    handleClose() {
      this.open = false;
    },
    handleAction({ item, data }) {
      this.$emit('action', { item, data });
    },
  },
};
</script>
