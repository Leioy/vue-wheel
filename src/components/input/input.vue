<template>
  <div :class="`${prefix}-wrapper`">
    <input type="text"
    :disabled="disabled"
    :value="value"
    @change="$emit('change',$event.target.value)"
    @blur="$emit('blur',$event.target.value)"
    @input="$emit('input',$event.target.value)"
    @focus="$emit('focus',$event.target.value)"
    >
    <template v-if="error">
      <y-icon name="error" class="icon-error"></y-icon>
      <span class="errorMessage">{{error}}</span>
    </template>
  </div>
</template>

<script>
import YIcon from '../icon/icon'
const prefix = 'y-input'
export default {
  name: prefix,
  components: {
    YIcon,
  },
  props: {
    value: {},
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
    },
  },
  data () {
    return {
      prefix,
    }
  },
}
</script>
