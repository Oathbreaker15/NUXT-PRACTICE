<script setup lang="ts">
const emit = defineEmits<{
  (e: 'reset-filters'): void
}>()
</script>

<template>
  <section class="nothing-found">
    <h2 class="nothing-found__header">No results found</h2>
    <p class="nothing-found__text">
      We couldn't find any products matching your selection. <br />
      Try adjusting your filters.
    </p>
    <button type="reset" class="nothing-found__btn" @click="emit('reset-filters')">
      Clear all filters
    </button>
  </section>
</template>

<style scoped lang="scss">
.nothing-found {
  margin: 0 auto;
  text-align: center;
  margin-top: calc(50vh - 100px);

  .nothing-found__header {
    margin-bottom: var(--margin-bottom-12);
  }

  .nothing-found__text {
    margin-bottom: var(--margin-bottom-8);
  }

  .nothing-found__btn {
    box-sizing: border-box;
    padding: 12px;
    border: 2px solid var(--grey-light);
    border-radius: 8px;
    font-weight: bold;
    background: transparent;
    color: var(--black);
    cursor: pointer;

    @include hover-active-opacity(0.6);
  }
}
</style>
