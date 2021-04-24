<template>
  <div class="control">
    <label class="control__label">
      <slot />
    </label>
    <input
      class="control__input"
      v-if="inputType === 'input'"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)">
    <textarea
      class="control__textarea"
      v-if="inputType === 'textarea'"
      rows="10"
      :value="value"
      @input="$emit('input', $event.target.value)"></textarea>
  </div>
</template>

<script>
export default {
  name: 'uiInput',
  props: {
    inputType: {
      type: String,
      default: 'input'
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>