<template>
  <svg class="y-icon">
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'y-icon',
  props: {
    name: {
      type: String,
    },
  },
}
</script>
