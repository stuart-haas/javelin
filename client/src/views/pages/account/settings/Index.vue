<template>
  <div class="w-full">
    <h1 class="text-4xl">Settings</h1>
    <div class="mt-6">
      <div class="flex items-center justify-start space-x-6">
        <router-link
          to="/account/settings/user"
          active-class="border-b-2 border-gray-700"
          class="transition duration-200 text-center px-2 py-1 border-b-2 border-transparent hover:text-blue-500"
          >User</router-link
        >
        <router-link
          to="/account/settings/shipping"
          active-class="border-b-2 border-gray-700"
          class="transition duration-200 text-center px-2 py-1 border-b-2 border-transparent hover:text-blue-500"
          >Shipping</router-link
        >
      </div>
      <div class="mt-10">
        <router-view />
      </div>
    </div>
  </div>
</template>
