<template>
  <div>
    <ul class="ml-8 list-outside" :class="listStyle">
      <li v-for="(item, i) in props.items" :key="i">
        <template v-if="typeof item.title === 'string'">
          {{ item.title }}
        </template>
        <component :is="item.title" v-else />
        <app-list
          :items="item.children"
          :level="props.level + 1"
          :options="props.options"
        />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { PropType, RendererElement, computed } from "vue";
interface OptionsType {
  listStyles?: string[];
}
interface ItemType {
  title: string | RendererElement;
  children?: ItemType[];
}
const props = defineProps({
  items: {
    type: Array as PropType<ItemType[]>,
    default: () => [],
  },
  options: {
    type: Object as PropType<OptionsType>,
    default: () => ({}),
  },
  level: {
    type: Number,
    default: 0,
  },
});
const listStyle = computed(() => {
  const style = props.options.listStyles?.at(props.level);
  return style || "disc";
});
</script>

<style scoped lang="scss">
ul {
  &.disc {
    list-style: disc;
  }
  &.circle {
    list-style: circle;
  }
  &.decimal {
    list-style: decimal;
  }
  &.none {
    list-style: none;
  }
  &.slash {
    list-style: none;
    li::before {
      content: "-";
      display: inline-block;
      width: 20px;
    }
  }
}
</style>
