<template>
  <form @submit.prevent="submit"></form>
</template>

<script>
export default {
  props: {
    fields: Array,
  },
  methods: {
    async submit() {},
  },
};
</script>
