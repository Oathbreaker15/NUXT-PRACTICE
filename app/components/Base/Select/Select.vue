<script setup lang="ts" generic="T extends Record<'key' | string | number, unknown>">
import { ref } from 'vue'

const props = defineProps<{
  name: string
  labelText: string
  isVertical?: boolean
  modelValue?: T
}>()

const emit = defineEmits<{
  (e: 'select', option: T): void
  (e: 'update:modelValue', option: T): void
}>()

const isOpened = ref(false)

const toggleDropdown = () => {
  isOpened.value = !isOpened.value
}

const selectOption = () => {
  isOpened.value = false
}
</script>

<template>
  <div
    :class="['base-select', { 'base-select--vertical': isVertical, 'base-select--open': isOpened }]"
  >
    <span class="base-select__label">{{ labelText }}</span>

    <div class="base-select__wrapper">
      <div class="base-select__input" @click="toggleDropdown" tabindex="0">
        {{ modelValue?.key || 'Select' }}
        <span
          v-if="modelValue?.order"
          :class="[
            'base-select__active-sort-arrow',
            `${modelValue.order === 'asc' ? 'base-select__active-sort-arrow--asc' : 'base-select__active-sort-arrow--desc'}`
          ]"
        ></span>
      </div>

      <ul v-if="isOpened" class="base-select__list">
        <slot :select="selectOption"></slot>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@include base-input('select');

.base-select {
  position: relative;
  display: flex;
  gap: 8px;

  &--vertical {
    flex-direction: row;
    align-items: center;
  }
}

.base-select__input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: var(--white);
  border: 1px solid var(--grey-light);
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  min-width: 100px;
}

.base-select__list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.base-select__arrow {
  font-size: 0.8em;
  transition: transform 0.3s;
}

.base-select--open .base-select__arrow {
  transform: rotate(180deg);
}

.base-select__active-sort-arrow {
  background: url('~/assets/svg/Sort/sort_arrow.svg') no-repeat 0 0;
  background-size: cover;
  width: 16px;
  height: 16px;

  &--desc {
    transform: rotate(180deg);
  }
}
</style>
