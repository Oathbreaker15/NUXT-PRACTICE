<script setup lang="ts">
import { setBlockSize } from '@/composables/useSkeletonBlockSize'
interface IProps {
  filterItemsAmount: number
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="filter-skeleton">
    <div class="filter-skeleton__title-wrapper">
      <h2 class="filter-skeleton__title"></h2>

      <span class="filter-skeleton__title-toggle"></span>
    </div>

    <form class="filter-skeleton__form">
      <template v-for="key in props.filterItemsAmount" :key="key">
        <div class="filter-skeleton-item filter-skeleton__content">
          <div :style="setBlockSize(172, 22)" class="filter-skeleton-item__header"></div>
          <div class="filter-skeleton-item__checkboxes">
            <div class="filter-skeleton-item__checkbox-content">
              <div :style="setBlockSize(16)" class="filter-skeleton-item__checkbox-block"></div>
              <div :style="setBlockSize(52)" class="filter-skeleton-item__checkbox-block"></div>
            </div>
            <div class="filter-skeleton-item__checkbox-content">
              <div :style="setBlockSize(16)" class="filter-skeleton-item__checkbox-block"></div>
              <div :style="setBlockSize(122)" class="filter-skeleton-item__checkbox-block"></div>
            </div>
            <div class="filter-skeleton-item__checkbox-content">
              <div :style="setBlockSize(16)" class="filter-skeleton-item__checkbox-block"></div>
              <div :style="setBlockSize(96)" class="filter-skeleton-item__checkbox-block"></div>
            </div>
            <div class="filter-skeleton-item__checkbox-content">
              <div :style="setBlockSize(16)" class="filter-skeleton-item__checkbox-block"></div>
              <div :style="setBlockSize(118)" class="filter-skeleton-item__checkbox-block"></div>
            </div>
            <div class="filter-skeleton-item__checkbox-content">
              <div :style="setBlockSize(16)" class="filter-skeleton-item__checkbox-block"></div>
              <div :style="setBlockSize(52)" class="filter-skeleton-item__checkbox-block"></div>
            </div>
          </div>
          <div :style="setBlockSize(85)" class="filter-skeleton-item__toggle-panel"></div>
        </div>
      </template>

      <div class="filter-skeleton__reset-btn"></div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.filter-skeleton {
  .filter-skeleton__title-wrapper {
    color: var(--white);
    background: var(--dark-grey);
    padding: 12px;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    height: 52px;

    .filter-skeleton__title-toggle {
      cursor: pointer;
      width: 16px;
      height: 16px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .filter-skeleton__content {
    display: flex;
    flex-direction: column;
    padding: 12px;
    background: var(--grey-light);
    &:not(:last-child) {
      border-bottom: 2px solid var(--grey-ultralight-opaque);
    }

    .filter-skeleton-item__header {
      @include skeleton-block();
      margin-bottom: 8px;
    }

    .filter-skeleton-item__checkbox-content {
      display: flex;
      gap: 8px;
      margin-top: 12px;

      .filter-skeleton-item__checkbox-block {
        @include skeleton-block();
      }
    }

    .filter-skeleton-item__toggle-panel {
      @include skeleton-block();
      margin-top: 12px;
    }
  }

  .filter-skeleton__reset-btn {
    width: 100%;
    box-sizing: border-box;
    height: 48px;
    border: none;
    background: var(--grey-light-opaque);
  }
}
</style>
