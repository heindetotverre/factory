<template>
  <div class="control control__select">
    <label class="control__label">
      <slot />
    </label>
    <input
      :class="`control__input ${setClasses}`"
      :value="input"
      @focus="focus()"
      :required="required"
      :disabled="disabled"
      :type="type">
    <div v-if="showList"
      class="control__select--list"
      ref="list">
      <div
        class="control__select--item"
        v-for="item in list"
        :key="item.name"
        @click="select(item)">{{ item.label }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'uiSearchSelect',
  props: {
    setClasses: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: null
    },
    list: {
      type: Array,
      required: true
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
      input: '',
      showList: false
    }
  },
  mounted () {
    if (this.preset) {
      const preset = this.list.find(i => {
        return i.name === this.preset
      })
      this.input = preset.label
      this.$emit('input', preset.name)
    }
  },
  methods: {
    focus () {
      this.showList = true
    },
    select (data) {
      this.showList = false
      this.input = data.label
      this.$emit('input', data.name)
    }
  }
}
</script>