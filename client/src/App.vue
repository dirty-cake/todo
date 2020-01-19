<template>
  <div id="app">
    <header class="header">
      <div class="header_content">
        <VInput v-if="isSignedIn" icon="search" placeholder="Quik find" class="header_content_search"/>
        <div class="header_content_controls">
          <VButton v-if="isSignedIn" theme="red" @click="signout">Sign out</VButton>
          <VButton v-else-if="$route.name === 'signin'" theme="red" @click="$router.push({ name: 'signup' })">Sign up</VButton>
          <VButton v-else-if="$route.name === 'signup'" theme="red" @click="$router.push({ name: 'signin' })">Sign in</VButton>
        </div>
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
      return this.$persistance.token !== undefined
    }
  },
  methods: {
    signout () {
      delete this.$persistance.userId
      delete this.$persistance.name
      delete this.$persistance.token
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "search controls";
}
.header_content_search {
  grid-area: search;
}
.header_content_controls {
  grid-area: controls;
  justify-self: end;
}
.main {
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px 10px;
}
</style>
