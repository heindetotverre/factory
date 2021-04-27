<template>
  <div class="factory factory__create-page create-page">
    <h1>Create a page</h1>
    <uiButton @click="goBack"
      setClasses="button button--sec">Back to dashboard</uiButton>
    <FactoriesFormCreator
      :formSchema="fields"
      :updatedForm="updatedForm"
      @excecuteForm="handleSubmit"/>
    <div v-if="!getHomePage" class="text spread">Because there is no homepage yet, this will be your homepage</div>
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
      fields: mapping('forms', 'FactoryCreatePage'),
      updatedForm: {}
    }
  },
  mounted () {
    const newFields = this.fields
    if (!this.getHomePage) {
      newFields.fields.isHomePage.disabled = true
      newFields.fields.Url.disabled = true
      newFields.fields.Url.preset = '/'
      newFields.fields.layout.preset = 'landingpage'
    }
  },
  computed: {
    ...mapGetters({
      getHomePage: 'pages/getHomePage'
    })
  },
  methods: {
    async handleSubmit (data) {
      console.log(data)
    },
    goBack () {
      this.$router.push('/factory')
    }
  }
}
</script>