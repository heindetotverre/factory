<template>
  <button
    :class="`button ${setClasses}`"
    v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'uiButton',
  props: {
    setClasses: {
      type: String,
      default: ''
    }
  }
}
</script>