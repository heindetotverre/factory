<template>
  <div>
    <h1>Create a page</h1>
    <button @click="goBack">Back to dashboard</button>
    <FactoriesFormCreator
      :formSchema="fields"
      :updatedForm="updatedForm"
      @excecuteForm="handleSubmit"/>
  </div>
</template>
<script>
import {mapping} from '@/plugins/mapping.js'
export default {
  name: 'PageCreator',
  layout: 'factory',
    data () {
    return {
      busy: false,
      formName: 'FactoryCreatePage',
      updatedForm: {}
    }
  },
  computed: {
    fields () {
      return mapping('forms', this.formName)
    }
  },
  methods: {
    async handleSubmit (data) {
      console.log(data)
    },
    goBack () {
      this.$router.push('/factory')
    },
    savePage () {
      this.$router.push('/factory')
      console.log('Page saved!')
    }
  }
}
</script>