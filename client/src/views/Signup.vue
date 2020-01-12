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
        const response = fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.name, login: this.login, password: this.password })
        })

        response.then(response => {
          if (response.status === 201) {
            response.json().then(user => {
              this.$persistance.name = user.name
              this.$persistance.login = user.login
              this.$persistance.password = user.password
              this.$persistance.userId = user.id
              this.$router.push({ name: 'todo' })
            })
          } else {
            alert('Server said NO!')
          }
        })
      }
    }
  }
}
</script>
