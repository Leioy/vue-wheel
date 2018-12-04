<template lang="pug">
  button.y-button(:class="[`icon-${iconPosition}`]")
    y-icon(v-if="loading" name="loading" class="icon loading")
    y-icon(v-if="icon && !loading" :name="icon" class="icon")
    .y-content
      slot
</template>

<script>
import YIcon from '@/components/icon/src/icon'
export default {
  name: 'y-button',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator (value) {
        return value === 'left' || value === 'right'
      },
    },
  },
  components: {
    YIcon,
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/var';
  .y-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: $button-height;
    vertical-align: middle;
    padding: 0 1em;
    background-color: $button-bg;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    font-size: $font-size;
    outline: none;
    &.icon-right {
      .icon {
        order: 2;
        margin-right: 0;
        margin-left: .1em;
      }
      .y-content {
        order: 1;
      }
    }
    &:hover {
      border-color: $border-color-hover;
    }
    &:active {
      background-color: $button-active-bg;
    }
    .icon {
      margin-right: .1em;
    }
    .loading {
      animation: spin 2s infinite linear;
    }
  }
</style>
