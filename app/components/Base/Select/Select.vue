<script setup lang="ts" generic="T extends Record<string | number, any>">
const props = defineProps<{
  name: string
  labelText: string
  options: T
  isVertical?: boolean
}>()

type Option = T extends unknown[] ? T[number] : keyof T

const emit = defineEmits<{
  (e: 'select', option: Option): void
}>()
</script>

<template>
  <nav :class="['base-select', { 'base-select--vertical': isVertical }]">
    <label :for="name" class="base-select__label">
      {{ labelText }}
    </label>

    <select
      :id="name"
      :name="name"
      class="base-select__input"
      @change="(e) => emit('select', (e.target as HTMLSelectElement).value as Option)"
    >
      <option
        v-for="(value, key) in options"
        :key="key"
        :value="Array.isArray(options) ? value : key"
        class="base-select__option"
      >
        {{ Array.isArray(options) ? value : key }}
      </option>
    </select>
  </nav>
</template>

<style scoped lang="scss">
select,
::picker(select) {
  appearance: base-select;
  border: none;
}

@include base-input('select');

.base-select__input {
  font-weight: bold;
  cursor: pointer;

  .base-select__option {
    display: flex;
    justify-content: flex-start;
    gap: 4px;
    border: 2px solid var(--grey-light);
    background: var(--white);
    padding: 8px 4px;
    transition: 0.4s;

    &:first-of-type {
      border-radius: 8px 8px 0 0;
    }

    &:last-of-type {
      border-radius: 0 0 8px 8px;
    }

    &:not(option:last-of-type) {
      border-bottom: none;
    }
  }
}
</style>
