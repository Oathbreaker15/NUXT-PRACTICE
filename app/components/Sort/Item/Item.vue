<script setup lang="ts" generic="T extends Record<'key' | string | number, unknown>">
type IProps = {
  option: T
  modelValue?: T
  select?: () => void
}

const emit = defineEmits<{
  (e: 'select', option: T): void
  (e: 'update:modelValue', option: T): void
}>()

const props = defineProps<IProps>()

const selectOption = (option: T) => {
  emit('select', option)
  emit('update:modelValue', option)
  props.select?.()
}

const isOptionActive = (option: T) => {
  return JSON.stringify(option) === JSON.stringify(props.modelValue)
}
</script>

<template>
  <li
    :class="['sort-item', { 'sort-item--active': isOptionActive(option) }]"
    @click="selectOption(option)"
  >
    {{ option.key }}

    <span
      v-if="option.order"
      :class="[
        'sort-item__arrow',
        `${option.order === 'asc' ? 'sort-item__arrow--asc' : 'sort-item__arrow--desc'}`
      ]"
    ></span>
  </li>
</template>

<style lang="scss" scoped>
.sort-item {
  display: flex;
  justify-content: space-between;
  gap: 4px;
  background: transparent;
  padding: 8px 12px;
  cursor: pointer;
  transition: 0.3s;

  &--active {
    font-weight: bold;
    background: var(--grey-light);
  }

  @media (hover: hover) {
    &:hover {
      background: var(--grey-light);
    }
  }

  .sort-item__arrow {
    background: url('~/assets/svg/Sort/sort_arrow.svg') no-repeat 0 0;
    background-size: cover;
    width: 16px;
    height: 16px;

    &--desc {
      transform: rotate(180deg);
    }
  }
}
</style>
