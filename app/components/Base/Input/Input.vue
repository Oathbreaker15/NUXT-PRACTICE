<script setup lang="ts">
interface IProps {
  name: string
  placeholder: string
  labelText?: string
  isVertical?: boolean
  btnText?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
  customWidth?: string
  customHeight?: string
  fullWidthMobile?: boolean
  withResetBtn?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  fullWidthMobile: true,
  withResetBtn: true
})

const model = defineModel<string>({ required: true })

const sizeMap = {
  sm: { width: '200px', height: '32px' },
  md: { width: '320px', height: '40px' },
  lg: { width: '100%', height: '48px' },
  full: { width: '100%', height: '100%' }
}

const inputSize = computed(() => {
  if (props.customWidth || props.customHeight) {
    return {
      width: props.customWidth || '100%',
      height: props.customHeight || '40px'
    }
  }
  return sizeMap[props.size || 'md']
})

const emit = defineEmits<{
  (e: 'update:model', value: string): void
  (e: 'submit', value: string): void
  (e: 'reset'): void
}>()
</script>

<template>
  <form
    :class="[
      'base-input',
      { 'base-input--vertical': isVertical },
      { 'base-input--full-mobile': fullWidthMobile }
    ]"
    @submit.prevent="emit('submit', model)"
  >
    <label v-if="labelText" :for="name" class="base-input__label">
      {{ labelText }}
    </label>

    <div
      :style="{
        '--input-width': `${inputSize.width}`,
        '--input-height': `${inputSize.height}`
      }"
      class="base-input__input-wrapper"
    >
      <input
        v-model="model"
        :id="name"
        :name="name"
        type="text"
        inputmode="text"
        :placeholder="placeholder"
        :class="['base-input__input', { 'base-input__input--with-button': btnText }, {'base-input__input--with-reset': props.withResetBtn}]"
      />

      <span v-if="model.length && props.withResetBtn" class="base-input__clear" @click="model = ''"></span>

      <button v-if="!!btnText" class="base-input__btn" type="submit">
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
    max-width: var(--input-width);
    max-height: var(--input-height);
  }

  .base-input__label {
    flex-shrink: 0;
  }

  .base-input__input {
    width: 100%;
    height: 100%;

    &.base-input__input--with-reset {
      padding-right: 32px;
    }

    &.base-input__input--with-button {
      padding-right: 112px;

      + .base-input__clear {
        right: 84px;
      }
    }
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

    @media (hover: hover) {
      &:hover {
        background-position-y: -24px;
      }
    }

    &:active {
      background-position-y: -48px;
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

  @media (max-width: $mobile-breakpoint) {
    flex-wrap: wrap;
  }

  &--full-mobile {
    @media (max-width: $mobile-breakpoint) {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
