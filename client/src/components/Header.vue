<template>
  <div
    class="flex items-center justify-between py-4 bg-white border border-gray-300 border-b"
  >
    <div class="w-10/12 m-auto flex justify-between">
      <slot name="left"></slot>
      <slot name="right"></slot>
    </div>
  </div>
</template>
