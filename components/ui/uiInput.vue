<template>
  <div :class="`control control__${inputType} ${setClasses}`">
    <label class="control__label">
      <slot />
    </label>
    <input
      class="input"
      v-if="inputType === 'input'"
      v-model="input"
      :required="required"
      :disabled="disabled"
      @input="$emit('input', input)"
      @focus="onFocus()"
      @blur="onBlur()"
      :type="type">
    <textarea
      class="textarea"
      v-if="inputType === 'textarea'"
      rows="10"
      v-model="input"
      :required="required"
      :disabled="disabled"
      @input="$emit('input', input)"
      @focus="onFocus()"
      @blur="onBlur()"
      :type="type"></textarea>
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
      this.$emit('input', this.preset)
    }
  },
  watch: {
    value () {
      this.input = this.value
    }
  },
  methods: {
    onBlur () {
      !this.input ? this.input = this.preset : ''
    },
    onFocus () {
      if (this.input === this.preset) {
        this.input = ''
      }
    }
  }
}
</script>