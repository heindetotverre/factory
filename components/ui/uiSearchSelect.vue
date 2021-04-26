<template>
  <div class="control">
    <label class="control__select">
      <slot />
    </label>
    <input
      :class="`control__input ${setClasses}`"
      :value="input"
      @focus="focus()"
      :required="required"
      :disabled="disabled"
      type="text">
    <div class="control__select--list" v-if="showList">
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
    }
  },
  data () {
    return {
      input: '',
      showList: false
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