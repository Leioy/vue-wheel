<template>
  <svg class="y-icon">
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
  },
}
</script>
