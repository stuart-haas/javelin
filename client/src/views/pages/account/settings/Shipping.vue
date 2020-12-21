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
          label: 'First Name',
          name: 'firstName',
        },
        {
          label: 'Last Name',
          name: 'lastName',
        },
        {
          label: 'Street',
          name: 'street',
        },
        {
          label: 'City',
          name: 'city',
          class: 'w-1/3 pr-4 float-left',
        },
        {
          label: 'State',
          name: 'state',
          class: 'w-1/3 pr-4 float-left',
        },
        {
          label: 'Zip Code',
          name: 'zipCode',
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
