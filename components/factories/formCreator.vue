<template>
  <form class="form__creator"
    @submit.prevent="excecuteForm()">
    <component v-for="field in formSchema.fields"
      :key="field.name"
      :is="field.component"
      :type="field.type"
      :inputType="field.inputType"
      v-model="formValues[field.name]"
      :required="field.required"
      :disabled="field.disabled || false"
      :list="field.items"
      :preset="field.preset"
      :setClasses="setClasses(field.classes)">
      <label>{{ field.label }}</label>
    </component>
    <button v-for="button in formSchema.buttons"
      :key="button.id">
      <span>{{ button.text }}</span>
    </button>
  </form>
</template>
<script>
export default {
  props: {
    formSchema: {
      type: Object,
      required: true,
      buttons: {
        type: Array,
        required: true
      },
      fields: {
        type: Array,
        required: true
      },
      name: {
        type: String,
        requird: true
      }
    },
    updatedForm: {
      type: Object,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      formValues: {}
    }
  },
  watch: {
    updatedForm () {
      this.formValues = this.updatedForm
    }
  },
  methods: {
    excecuteForm () {
      this.$emit('excecuteForm', {
        form: this.formSchema.name,
        values: this.formValues
      })
      this.formValues = {}
    },
    setClasses (data) {
      
    }
  }
}
</script>
