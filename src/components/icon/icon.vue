<template>
  <svg class="y-icon" :style="styleObj">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'y-icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
  },
  computed: {
    styleObj () {
      return {
        color: this.color,
      }
    },
  },
}
</script>
