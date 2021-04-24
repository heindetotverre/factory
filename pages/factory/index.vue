<template>
  <div class="factory factory__login login">
    <div class="message message--error">
      <p>{{ message }}</p>
    </div>
    <FactoriesFormCreator
      :formSchema="fields"
      :updatedForm="updatedForm"
      @excecuteForm="handleSubmit"/>
    <uiButton @click="switchAuth">{{ formName === 'FactoryAuth' ? 'Register' : 'Login' }}</uiButton>
    <layoutSpinner v-if="busy"></layoutSpinner>
  </div>
</template>

<script>
import {mapFields} from '@/plugins/formFields.js'

export default {
  name: 'FactoryAuth',
  layout: 'factory',
  data () {
    return {
      busy: false,
      formName: 'FactoryAuth',
      message: '',
      updatedForm: {}
    }
  },
  computed: {
    fields () {
      return mapFields(this.formName)
    }
  },
  methods: {
    async handleSubmit (data) {
      this.busy = true
      if (data.form === 'FactoryRegister' && data.values.Password !== data.values.PasswordAgain) {
        this.updatedForm = {
          ...data.values,
          Password: '',
          PasswordAgain: ''
        }
        this.message = 'Passwords dont match'
        return
      }
      delete data.values.PasswordAgain
      const authResult = await this.$store.dispatch('auth/auth', data)
      if (authResult.function === 'register') {
        if (!authResult.registered) {
          this.updatedForm = {
            ...data.values,
            Password: '',
            PasswordAgain: '',
            Email: ''
          }
          this.message = authResult.message
        }
      }
      if (authResult.function === 'login') {
        if (authResult.authorized) {
          this.$router.push({ path: '/factory/floor', params: { from: 'login' } })
        } else {
            this.updatedForm = {
            ...data.values,
            Password: ''
          }
          this.message = authResult.message
        }
      }
      this.busy = false
    },
    switchAuth () {
      this.formName === 'FactoryAuth'
        ? this.formName = 'FactoryRegister'
        : this.formName = 'FactoryAuth'
      this.message = ''
    }
  }
}
</script>