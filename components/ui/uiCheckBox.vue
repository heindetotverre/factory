<template>
  <div class="control">
    <label class="control__label">
      <slot />
    </label>
    <input
      :class="`control__checkbox ${setClasses}`"
      :checked="input"
      @input="onInput()"
      :type="type"
      :required="required"
      :disabled="disabled">
  </div>
</template>
<script>
export default {
  name: 'uiCheckBox',
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
    },
    preset: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      input: false
    }
  },
  mounted () {
    if (this.preset) {
      this.input = this.preset
    }
  },
  methods: {
    onInput () {
      this.input = !this.input
      this.$emit('input', this.input)
    }
  }
}
</script>