<template>
  <div
    v-bind="$attrs"
    v-on="$listeners"
    class="w-4 h-4 bg-gray-400 rounded-full p-3 text-center text-white flex items-center justify-center cursor-pointer hover:bg-red-500 transition duration-300 "
  >
    <Icon icon="times" />
  </div>
</template>
