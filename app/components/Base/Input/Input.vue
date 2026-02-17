<script setup lang="ts">
interface IProps {
  name: string
  placeholder: string
  labelText?: string
  value?: string
  isVertical?: boolean
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  (e: 'input', value: string): void
  (e: 'reset'): void
}>()
</script>

<template>
  <div :class="['base-input', { 'base-input--vertical': isVertical }]">
    <label v-if="labelText" :for="name" class="base-input__label">
      {{ labelText }}
    </label>

    <div class="base-input__input-wrapper">
      <input
        :id="name"
        :name="name"
        type="text"
        inputmode="text"
        :placeholder="placeholder"
        :value="value"
        class="base-input__input"
        @input="(e) => emit('input', (e.target as HTMLSelectElement).value)"
      />

      <span v-if="value?.length" class="base-input__clear" @click="emit('reset')"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@include base-input('input');

.base-input {
  .base-input__input-wrapper {
    position: relative;
  }

  .base-input__clear {
    position: absolute;
    cursor: pointer;
    top: calc(50% - 12px);
    right: 4px;
    width: 24px;
    height: 24px;
    background: url('~/assets/svg/clear.svg') no-repeat 0 0;
    background-size: cover;

    @include hover-active-opacity(0.6);

    &:active {
      background-position-y: -24px;
    }
  }

  &:focus-within {
    .base-input__label {
      color: var(--black);
    }

    .base-input__input {
      outline: none;
      border-color: var(--grey-emphasized);
    }
  }

  @media (max-width: 639px) {
    flex-wrap: wrap;
  }
}
</style>
