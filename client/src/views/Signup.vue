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
    async signup () {
      if (this.name === '' || this.password === '' || this.login === '' || this.passwordConfirmation === '') {
        alert('All fields shouldn\'t be empty')
      } else if (this.password !== this.passwordConfirmation) {
        alert('Check your passwords')
      } else {
        try {
          const user = await this.$fetch('/users/signup', {
            method: 'POST',
            body: { name: this.name, login: this.login, password: this.password }
          })
          this.$persistance.userId = user.id
          this.$persistance.name = user.name
          this.$persistance.token = user.token
          this.$router.push({ name: 'todo' })
        } catch (error) {
          alert(error.message)
        }
      }
    }
  }
}
</script>
