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
    async signin () {
      try {
        const user = await this.$fetch(`/users/signin`, {
          method: 'POST',
          body: { login: this.login, password: this.password }
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
</script>
