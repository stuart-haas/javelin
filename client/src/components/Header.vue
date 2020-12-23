<template>
  <div
    class="flex items-center justify-between px-8 py-4 bg-white border border-gray-300 border-b"
  >
    <div class="w-full flex justify-between">
      <slot name="left"></slot>
      <slot name="right"></slot>
    </div>
  </div>
</template>
