<template>
  <form class="form__creator"
    @submit.prevent="excecuteForm()">
    <component v-for="field in formSchema.fields"
      :key="field.id"
      :is="field.component"
      :type="field.type"
      :inputType="field.inputType || 'input'"
      v-model="formValues[field.name]"
      :required="field.required">
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
      name: {
        type: String,
        requird: true
      },
      fields: {
        type: Array,
        required: true
      },
      buttons: {
        type: Array,
        required: true
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
      if (this.updatedForm) {
        this.formValues = this.updatedForm
      }
    }
  },
  methods: {
    excecuteForm () {
      this.$emit('excecuteForm', {
        form: this.formSchema.name,
        values: this.formValues
      })
      this.formValues = {}
    }
  }
}
</script>
