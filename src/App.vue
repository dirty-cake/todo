<template>
  <div id="app">
    <header class="header">
      <div class="header_content">
        <VInput icon="search" placeholder="Quik find"/>
        <VButton v-if="isSignedIn" theme="red" @click="signout">Sign out</VButton>
        <VButton v-else-if="$route.name === 'signin'" theme="red" @click="$router.push({ name: 'signup' })">Sign up</VButton>
        <VButton v-else-if="$route.name === 'signup'" theme="red" @click="$router.push({ name: 'signin' })">Sign in</VButton>
      </div>
    </header>
    <main class="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    isSignedIn () {
      return this.$persistance.login !== undefined && this.$persistance.password !== undefined
    }
  },
  methods: {
    signout () {
      delete this.$persistance.login
      delete this.$persistance.password
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>
<style>
html, body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  background-color: #d34827;
  padding: 10px;
}
.header_content {
  width: 100%;
  max-width: 1080px;
  display: flex;
  justify-content: space-between;
}
.main {
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px 10px;
}
</style>
