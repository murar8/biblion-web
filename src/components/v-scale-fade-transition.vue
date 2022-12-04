<template>
  <Transition name="scale-fade" mode="out-in">
    <slot />
  </Transition>
</template>

<style scoped>
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.2s ease-out;
}

.scale-fade-enter-from,
.scale-fade-leave-to {
  transform: scaleX(0);
  opacity: 0;
}
</style>
