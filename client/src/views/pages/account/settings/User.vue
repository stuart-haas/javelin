<template>
  <Form
    :fields="fields"
    dispatch="put"
    api="user"
    :param="id"
    submitLabel="Update"
    @success="success"
    class="w-8/12"
  />
</template>

<script>
export default {
  data() {
    return {
      user: {},
      formFields: [
        {
          label: 'Username',
          name: 'username',
        },
        {
          label: 'Email',
          name: 'email',
        },
      ],
    };
  },
  computed: {
    id() {
      return this.$store.state.user.user._id;
    },
    fields() {
      return this.mapFieldData(this.user, this.formFields);
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const user = this.$store.state.user.user;
      this.user = user;
    },
    success({ user }) {
      this.$store.commit('user/setState', { name: 'user', value: user });
    },
  },
};
</script>
