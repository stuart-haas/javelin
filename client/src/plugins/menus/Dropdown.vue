<template>
  <div
    class="dropdown is-right"
    :class="{ 'is-active': open }"
    @click="open = !open"
    v-click-outside="handleClose"
  >
    <div class="dropdown-trigger">
      <slot v-if="hasTrigger" name="trigger" />
      <button
        v-else
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
      >
        <span>Dropdown button</span
        ><Icon icon="angle-down" aria-hidden="true" />
      </button>
    </div>
    <transition name="fade">
      <div v-if="open" class="dropdown-menu" role="menu">
        <div class="dropdown-content">
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
    hasTrigger() {
      return !!this.$slots.trigger;
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
