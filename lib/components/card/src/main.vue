<template>
  <div class="wx-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div class="wx-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="wx-card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WxCard',
  props: {
    header: {},
    shadow: {
      type: String
    }
  }
}
</script>
