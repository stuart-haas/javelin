<template>
  <div class="mt-1">
    <div class="flex items-center justify-between">
      <h2 class="h2">Users</h2>
      <Button theme="secondary" tag="router-link" to="/cp/users/register"
        >Register User</Button
      >
    </div>
    <table class="w-full table-auto text-left mt-6">
      <tr class="font-bold border-b border-gray-300">
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
      <tr
        v-for="user in users"
        :key="user._id"
        :class="user._id === userId ? 'font-bold' : ''"
      >
        <td>
          <router-link :to="`/cp/users/${user._id}`" class="text-blue-500">{{
            user.username
          }}</router-link>
        </td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  computed: {
    userId() {
      return this.$store.state.user.user._id;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const users = await this.$store.dispatch('get', { api: 'user' });
      if (users) {
        this.users = users;
      }
    },
  },
};
</script>

<style scoped>
th,
td {
  @apply p-2;
}
</style>
