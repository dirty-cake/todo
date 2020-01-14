<template>
  <div>
    <VInput v-model="login" placeholder="Login" theme="black" @keyup.enter="signin"/>
    <VInput v-model="password" placeholder="Password" theme="black" @keyup.enter="signin"/>
    <VButton @click="signin">Sign in</VButton>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    signin () {
      const response = fetch(`http://localhost:3000/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: this.login, password: this.password })
      })

      response.then(response => {
        if (response.status === 200) {
          response.json().then(user => {
            this.$persistance.userId = user.id
            this.$persistance.name = user.name
            this.$persistance.token = user.token
            this.$router.push({ name: 'todo' })
          })
        } else {
          response.text().then(text => alert(text))
        }
      })
    }
  }
}
</script>
