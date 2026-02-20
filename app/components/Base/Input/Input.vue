<script setup lang="ts">
interface IProps {
  name: string
  placeholder: string
  labelText?: string
  isVertical?: boolean
  btnText?: string
  width: number
  height: number
}

const props = defineProps<IProps>()
const model = defineModel<string>({ required: true })

const emit = defineEmits<{
  (e: 'update:model', value: string): void
  (e: 'submit', value: string): void
  (e: 'reset'): void
}>()
</script>

<template>
  <form
    :class="['base-input', { 'base-input--vertical': isVertical }]"
    @submit.prevent="emit('submit', model)"
  >
    <label v-if="labelText" :for="name" class="base-input__label">
      {{ labelText }}
    </label>

    <div
      :style="`max-width: ${width}px; max-height: ${height}px;`"
      class="base-input__input-wrapper"
    >
      <input
        v-model="model"
        :id="name"
        :name="name"
        type="text"
        inputmode="text"
        :placeholder="placeholder"
        class="base-input__input"
      />

      <span v-if="model.length" class="base-input__clear" @click="model = ''"></span>

      <button
        v-if="!!btnText"
        class="base-input__btn"
        type="submit"
      >
        {{ btnText }}
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@include base-input('input');

.base-input {
  .base-input__input-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .base-input__input {
    width: 100%;
    height: 100%;
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

  .base-input__btn {
    position: absolute;
    right: 0;
    box-sizing: border-box;
    padding: 8px 12px;
    height: 40px;
    width: 80px;
    color: var(--white);
    border: none;
    background: var(--black-light);
    border-radius: 0 4px 4px 0;
    height: 100%;
    font-weight: bold;
    cursor: pointer;

    @include hover-active-brand-background-color();
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
