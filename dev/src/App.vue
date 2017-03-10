<template>
  <div id="app">
    <nav>
      <router-link to="/">HOME</router-link><!--
      --><router-link to="/login" class="nav-link" v-bind:style="{ display: isLogin ? 'none' : '' }">LOGOUT</router-link><!--
      --><router-link to="/bar" class="nav-link">BAR</router-link><!--
      --><router-link to="/foo" class="nav-link">FOO</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isLogin: false,
    };
  },
  watch: {
    $route(to) { // (to,from)
      this.isLogin = to.path === '/login';
    },
  },
};
</script>

<style>
body, html {
  margin: 0;
  padding: 0;

  width: 100%;
  height: 100%;
}
</style>

<style scoped>
nav {
  z-index: 9999;

  background-color: #000;
}

nav a {
  padding: 20px;

  display: inline-block;

  color: #fff;
  text-decoration: none;
}

nav a.nav-link {
  float: right;
}
</style>
