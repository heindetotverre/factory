<template>
  <div class="control">
    <label class="control__label">
      <slot />
    </label>
    <input
      class="control__input"
      v-if="inputType === 'input'"
      :value="value"
      :type="type"
      :required="required"
      @input="$emit('input', $event.target.value)">
    <textarea
      class="control__textarea"
      v-if="inputType === 'textarea'"
      rows="10"
      :value="value"
      :required="required"
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
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>