<template>
  <div class="w-10/12 m-auto">
    <div class="grid grid-cols-12 gap-6 h-screen">
      <div class="col-span-4 border-r pt-8">
        <h1 class="h1">Dashboard</h1>
        <div class="mt-6 space-y-6">
          <router-link
            to="/cp/orders"
            active-class="border-r-4 border-gray-700"
            class="block transition duration-300 px-2 py-1 border-r-4 border-transparent hover:text-blue-500"
            >Orders</router-link
          >
          <router-link
            to="/cp/products"
            active-class="border-r-4 border-gray-700"
            class="block transition duration-300 px-2 py-1 border-r-4 border-transparent hover:text-blue-500"
            >Products</router-link
          >
          <router-link
            to="/cp/users"
            active-class="border-r-4 border-gray-700"
            class="block transition duration-300 px-2 py-1 border-r-4 border-transparent hover:text-blue-500"
            >Users</router-link
          >
          <router-link
            to="/cp/settings"
            active-class="border-r-4 border-gray-700"
            class="block transition duration-300 px-2 py-1 border-r-4 border-transparent hover:text-blue-500"
            >Settings</router-link
          >
        </div>
      </div>
      <div class="col-span-8 pt-8">
        <router-view />
      </div>
    </div>
  </div>
</template>
