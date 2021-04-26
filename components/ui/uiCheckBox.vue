<template>
  <div class="control">
    <label class="control__label">
      <slot />
    </label>
    <input
      class="control__checkbox"
      :value="value"
      @input="$emit('input', $event.target.checked)"
      type="checkbox"
      :required="required">
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
    }
  }
}
</script>