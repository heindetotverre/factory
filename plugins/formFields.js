const mapFields = (formName) => {
  const fields = {
    email: {
      label: 'Email',
      name: 'Email',
      required: true,
      component: 'uiInput',
      validators: ['email'],
      type: 'email'
    },
    password: {
      label: 'Password',
      name: 'Password',
      required: true,
      component: 'uiInput',
      validators: ['password'],
      type: 'password'
    },
    passwordAgain: {
      label: 'Password again',
      name: 'PasswordAgain',
      required: true,
      component: 'uiInput',
      validators: ['password'],
      type: 'password'
    },
    firstName: {
      label: 'First name',
      name: 'FirstName',
      required: true,
      component: 'uiInput',
      validators: ['nonumbers'],
      type: 'text'
    },
    lastName: {
      label: 'Last name',
      name: 'LastName',
      required: true,
      component: 'uiInput',
      validators: ['nonumbers'],
      type: 'text'
    },
    websiteName: {
      label: 'Website name',
      name: 'WebsiteName',
      required: true,
      component: 'uiInput',
      validators: ['notempty'],
      type: 'text'
    },
    billingInfo: {
      label: 'Billing info',
      name: 'BillingInfo',
      component: 'uiInput',
      inputType: 'textarea',
      validators: ['noscript']
    }
  }
  const buttons = {
    login: {
      text: 'Login'
    },
    register: {
      text: 'Register'
    }
  }
  const forms = {
    FactoryAuth: {
      name: 'FactoryAuth',
      fields: { email: fields.email, password: fields.password },
      buttons: { login: buttons.login }
    },
    FactoryRegister: {
      name: 'FactoryRegister',
      fields: { email: fields.email, password: fields.password, passwordAgain: fields.passwordAgain, firstName: fields.firstName, lastName: fields.lastName, websiteName: fields.websiteName, billingInfo: fields.billingInfo },
      buttons: { register: buttons.register }
    }
  }
  return forms[formName]
}

export {
  mapFields
}