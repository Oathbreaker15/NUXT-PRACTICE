<script setup lang="ts"></script>

<template>
  <div class="filters-panel">
    <slot name="left-item"></slot>

    <slot name="right-item"></slot>
  </div>
</template>

<style scoped lang="scss">
.filters-panel {
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 8px;

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    background-color: var(--black-light);
    transform: translate(-50%);
    left: 0;
    width: 200vw;
    min-width: 100%;
    height: 100%;
  }
}
</style>
