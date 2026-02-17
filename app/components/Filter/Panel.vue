<script setup lang="ts">
import { FilterPageStore } from '~/store/FilterPage'
import type { ProductsFiltersAPIResponse } from '~~/shared/types/ProductsFiltersAPIResponse'
import { useDeviceType } from '#imports'

const emit = defineEmits<{
  (e: 'reset-filters'): void
  (e: 'select-filter-value', category: keyof ProductsFiltersAPIResponse, filterParam: string): void
  (e: 'toggle-panel-item-view', category: keyof ProductsFiltersAPIResponse): void
  (e: 'toggle-panel-view'): void
}>()

const props = defineProps<{
  header: string
  isToggleble: boolean
  isResetable: boolean
  closeOnDevice?: () => void
}>()

const { isDesktop } = useDeviceType()
const store = FilterPageStore()
const { isResetBtnDisabled, isPanelAllOpened } = storeToRefs(store)
</script>

<template>
  <aside class="filter">
    <div class="filter__title-wrapper">
      <h2 class="filter__title">{{ header }}</h2>

      <span v-if="isToggleble" class="filter__title-toggle" @click="emit('toggle-panel-view')">{{
        isPanelAllOpened ? 'Collapse all' : 'Expand all'
      }}</span>

      <span v-if="!isDesktop" class="filter__title-close" @click="closeOnDevice"></span>
    </div>

    <form class="filter__form">
      <slot></slot>

      <button
        v-if="isResetable"
        type="reset"
        class="filter__reset-btn"
        :disabled="isResetBtnDisabled"
        @click="emit('reset-filters')"
      >
        Reset filters
      </button>
    </form>
  </aside>
</template>

<style lang="scss" scoped>
.filter {
  .filter__title-wrapper {
    color: var(--white);
    background-color: var(--black-light);
    padding: 12px;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;

    .filter__title {
      text-transform: uppercase;
      font-weight: bold;
    }

    .filter__title-toggle {
      cursor: pointer;
      margin-left: auto;

      &:hover {
        text-decoration: underline;
      }
    }

    .filter__title-close {
      width: 16px;
      height: 16px;
      color: var(--white);
      background: url('~/assets/svg/close.svg') no-repeat 0 0;
      background-size: cover;
      margin-left: 12px;
    }
  }

  :deep(.filter__content) {
    padding: 12px;
    &:not(:last-child) {
      border-bottom: 2px solid var(--grey-ultralight-opaque);
    }
  }

  .filter__reset-btn {
    width: 100%;
    box-sizing: border-box;
    height: 48px;
    border: none;
    background: var(--grey-light-opaque);
    font-weight: 700;
    text-transform: uppercase;

    &:not(:disabled) {
      cursor: pointer;
      @include hover-active-opacity(0.6);
    }
  }

  @media (max-width: 1095px) {
    .filter__form {
      height: calc(100vh - 46px);
      background: var(--grey-light-opaque);
      overflow: auto;
    }
  }
}
</style>
