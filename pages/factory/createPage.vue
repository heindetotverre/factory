<template>
  <div class="factory factory__create-page create-page">
    <h1>Create a page</h1>
    <uiButton @click="goBack"
      setClasses="button button--sec">Back to dashboard</uiButton>
    <FactoriesFormCreator
      :formSchema="form"
      :updatedForm="updatedForm"
      @excecuteForm="handleSubmit"/>
    <div v-if="!getHomePage" class="text spread" :class="error ? 'error' : ''">{{ message }}</div>
    <layoutSpinner v-if="busy"></layoutSpinner>
  </div>
</template>
<script>
import {mapping} from '@/plugins/mapping.js'
import { mapGetters } from 'vuex'
export default {
  name: 'PageCreator',
  layout: 'factory',
  data () {
    return {
      busy: false,
      error: false,
      form: mapping('forms', 'FactoryCreatePage'),
      message: !this.getHomePage ? 'Because there is no homepage yet, this will be your homepage' : '',
      updatedForm: {}
    }
  },
  mounted () {
    if (!this.getHomePage) {
      this.form.fields.isHomePage.disabled = true
      this.form.fields.Url.disabled = true
      this.form.fields.Url.preset = '/'
      this.form.fields.layout.preset = 'landingpage'
    }
  },
  computed: {
    ...mapGetters({
      getHomePage: 'pages/getHomePage'
    })
  },
  methods: {
    async handleSubmit (data) {
      this.busy = true
      try {
        const createPageResult = await this.$store.dispatch('pages/createPage', {
          function: 'createPage',
          collection: 'Pages',
          values: data.values
        })
        if (createPageResult.page) {
          this.$router.push('/admin')
        }
        if (createPageResult.response.status === 500) {
          this.error = true
          this.message = `Database error: Status: ${createPageResult.response.status}. Message: ${createPageResult.response.data.message}`
          this.updatedForm = {
            ...data.values,
          }
        }
      } catch (error) {
        this.message = error.message
      }
      this.busy = false
    },
    goBack () {
      this.$router.push('/factory')
    }
  }
}
</script>