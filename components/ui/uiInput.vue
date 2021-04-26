<template>
  <div class="control">
    <label class="control__label">
      <slot />
    </label>
    <input
      :class="`control__input ${setClasses}`"
      v-if="inputType === 'input'"
      v-model="input"
      :required="required"
      :disabled="disabled"
      @input="$emit('input', input)">
    <textarea
      :class="`control__textarea ${setClasses}`"
      v-if="inputType === 'textarea'"
      rows="10"
      v-model="input"
      :required="required"
      :disabled="disabled"
      @input="$emit('input', input)"></textarea>
  </div>
</template>

<script>
export default {
  name: 'uiInput',
  props: {
    setClasses: {
      type: String,
      default: ''
    },
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    preset: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      input: ''
    }
  },
  mounted () {
    if (this.preset) {
      this.input = this.preset
    }
  }
}
</script>