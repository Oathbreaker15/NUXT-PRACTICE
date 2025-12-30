<script setup lang="ts">
type Filter = {
  name: string
  filter: string[]
}
const props = defineProps<Filter>()
const isToggled = ref(false)
</script>

<template>
  <div class="filters-item">
    <h3 class="filters-item__name">{{ props.name }}</h3>
    <label
      v-for="(value, i) in props.filter"
      :for="`${i}`"
      :key="value"
      :class="[
        'filters-item__value',
        isToggled ? 'filters-item__toggler--opened' : 'filters-item__toggler--closed'
      ]"
    >
      <input type="checkbox" :name="value" :id="`${i}`" />
      <span class="filters-item__value-name">{{ value }}</span>
    </label>

    <div
      v-if="props.filter.length > 5"
      class="filters-item__toggler"
      @click="isToggled = !isToggled"
    >
      {{ isToggled ? 'Hide' : 'Show more' }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filters-item {
  display: flex;
  flex-direction: column;
  background: var(--grey-light-opaque);
  text-transform: capitalize;

  .filters-item__name {
    margin-bottom: 8px;
  }

  .filters-item__value {
    margin-top: 12px;
    cursor: pointer;

    @media (hover: hover) {
      &:hover .filters-item__value-name {
        opacity: 0.6;
      }
    }

    .filters-item__value-name {
      margin-left: 8px;
    }

    &.filters-item__toggler--closed:nth-child(n + 7) {
      display: none;
    }
  }

  .filters-item__toggler {
    margin-top: 12px;
    cursor: pointer;
    color: var(--link);

    @media (hover: hover) {
      &:hover {
        color: var(--brand-light);
      }
    }
  }
}
</style>
