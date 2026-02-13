<script setup lang="ts">
interface IProps {
  icon: string
  text: string
}

const props = defineProps<IProps>()

const allAssets = import.meta.glob('~/assets/svg/Filter/DeviceBarBtnIcons/*.svg', {
  eager: true,
  import: 'default'
})

const iconSrc = computed(() => {
  const target = `${props.icon}.svg`
  const key = Object.keys(allAssets).find((path) => path.endsWith(target))
  return (key ? allAssets[key] : '') as string
})

const isActive = ref(false)

const closePanel = () => (isActive.value = false)

useHead({
  bodyAttrs: {
    class: computed(() => (isActive.value ? 'overflow-hidden' : ''))
  }
})
</script>

<template>
  <div class="device-bar-btn">
    <div class="device-bar-btn__content" @click="isActive = !isActive">
      <img :src="iconSrc" :alt="`${text} icon`" class="device-bar-btn__icon" />
      <div class="device-bar-btn__text">{{ text }}</div>
    </div>

    <div v-if="isActive" class="device-bar-btn__scrim" @click="closePanel"></div>

    <div :class="['device-bar-btn__panel', { 'device-bar-btn__panel--active': isActive }]">
      <slot :close="closePanel"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.device-bar-btn {
  .device-bar-btn__content {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 16px;
    position: relative;
  }

  .device-bar-btn__icon {
    width: 24px;
    height: 24px;
  }

  .device-bar-btn__text {
    color: var(--white);
    font-size: 13px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .device-bar-btn__scrim {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #171b26;
    opacity: 0.6;
  }

  .device-bar-btn__panel {
    transform: translateX(-304px);
    max-width: 304px;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 2;
    transition: 0.4s;

    &.device-bar-btn__panel--active {
      transform: translateX(0);
    }
  }
}
</style>
