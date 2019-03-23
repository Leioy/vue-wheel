<template>
  <div class="y-tabs-pane" v-show="show">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'y-tab-pane',
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      show: true,
    }
  },
}
</script>
