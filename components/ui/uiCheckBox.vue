<template>
  <div class="control">
    <label class="control__label">
      <slot />
    </label>
    <input
      :class="`control__checkbox ${setClasses}`"
      :value="value"
      @input="$emit('input', $event.target.checked)"
      :type="type"
      :required="required"
      :disabled="disabled">
  </div>
</template>
<script>
export default {
  name: 'uiButton',
  props: {
    setClasses: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>