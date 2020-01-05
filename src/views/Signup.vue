<template>
  <div>
    <VInput v-model="name" placeholder="Name" theme="black" @keyup.enter="signup"/>
    <VInput v-model="login" placeholder="Login" theme="black" @keyup.enter="signup"/>
    <VInput v-model="password" placeholder="Password" theme="black" @keyup.enter="signup"/>
    <VInput v-model="passwordConfirmation" placeholder="Confirm password" theme="black" @keyup.enter="signup"/>
    <VButton @click="signup">Sign up</VButton>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      login: '',
      password: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    signup () {
      if (this.name === '' || this.password === '' || this.login === '' || this.passwordConfirmation === '') {
        alert('All fields shouldn\'t be empty')
      } else if (this.password !== this.passwordConfirmation) {
        alert('Check your passwords')
      } else {
        this.$persistance.login = this.login
        this.$persistance.password = this.password
        this.$router.push({ name: 'todo' })
      }
    }
  }
}
</script>
