<template>
  <div class="skeleton__block">
    <div class="skeleton__block-item"></div>
  </div>
</template>

<style scoped lang="scss">
.skeleton__block {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
  margin-top: var(--margin-top-16);

  .skeleton__block-item {
    @include skeleton-block();
    width: 100%;
    height: 43px;
  }
}
</style>
