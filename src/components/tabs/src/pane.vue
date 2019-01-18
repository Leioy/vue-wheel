<template lang="pug">
  .y-tabs-pane(v-show="show")
    slot
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
