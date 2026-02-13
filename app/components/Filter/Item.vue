<script setup lang="ts">
import { CATEGORIES_NAMES } from '~/constants/product/categoriesNames'

type Filter = {
  name: keyof ProductsFiltersAPIResponse
  filter: string[]
  filterObj: ProductsFiltersAPIResponse
  isPanelOpened: boolean
}

const emit = defineEmits<{
  (e: 'select-filter-value', category: keyof ProductsFiltersAPIResponse, filterParam: string): void
  (e: 'toggle-panel-item-view', category: keyof ProductsFiltersAPIResponse): void
}>()

const props = defineProps<Filter>()
const isToggled = ref(false)

const isChecked = (value: string) => {
  const selected = props.filterObj[props.name]
  return Array.isArray(selected) && selected.includes(value)
}

const toggleItemVisibility = (category: keyof ProductsFiltersAPIResponse) => {
  emit('toggle-panel-item-view', category)
}
</script>

<template>
  <div class="filter-item">
    <h3
      :class="[
        'filter-item__name',
        isPanelOpened ? 'filter-item__name--panel-opened' : 'filter-item__name--panel-closed'
      ]"
      @click="toggleItemVisibility(props.name)"
    >
      {{ CATEGORIES_NAMES[props.name] }}
    </h3>

    <Transition name="expand">
      <div v-show="isPanelOpened" class="filter-item__content">
        <label
          v-for="(value, i) in props.filter"
          :key="value.id"
          :for="value.id"
          :class="[
            'filter-item__value',
            isToggled ? 'filter-item__toggler--opened' : 'filter-item__toggler--closed'
          ]"
        >
          <input
            :id="value.id"
            type="checkbox"
            :name="value"
            :checked="isChecked(value)"
            @input="emit('select-filter-value', props.name, value)"
          />
          <span class="filter-item__value-name">{{ value }}</span>
        </label>

        <div
          v-if="props.filter.length > 5"
          class="filter-item__toggler"
          @click="isToggled = !isToggled"
        >
          {{ isToggled ? 'Hide' : 'Show more' }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.filter-item {
  background: var(--grey-light-opaque);

  .filter-item__content {
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
  }

  .filter-item__name {
    margin-bottom: 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    @include hover-active-opacity(0.6);

    &::after {
      content: '';
      transition: 0.2s;
      display: block;
      width: 16px;
      height: 16px;
      background: url('~/assets/svg/arrow.svg') no-repeat 0 0;
      background-size: cover;
      transform: rotate(0deg);
    }

    &.filter-item__name--panel-closed {
      margin-bottom: 0;

      &::after {
        transform: rotate(180deg);
      }
    }
  }

  .filter-item__value {
    margin-top: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;

    @media (hover: hover) {
      &:hover .filter-item__value-name {
        opacity: 0.6;
      }
    }

    .filter-item__value-name {
      margin-left: 8px;
    }

    &.filter-item__toggler--closed:nth-child(n + 6) {
      display: none;
    }
  }

  .filter-item__toggler {
    margin-top: 12px;
    cursor: pointer;
    color: var(--link);
    width: fit-content;

    @media (hover: hover) {
      &:hover {
        color: var(--brand-light);
      }
    }
  }

  .expand-enter-from,
  .expand-leave-to {
    opacity: 0;
    max-height: 0;
  }

  .expand-enter-active,
  .expand-leave-active {
    transition: all 0.3s ease;
    overflow: hidden;
  }
}
</style>
