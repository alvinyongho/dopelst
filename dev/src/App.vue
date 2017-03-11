<template>
  <div id="app">
    <nav>
      <router-link to="/">HOME</router-link>
      <div class="nav-link" v-bind:style="{ display: isLogin ? 'none' : '' }" v-on:click="logoutUser">LOGOUT</div>
      <router-link to="/bar" class="nav-link">BAR</router-link>
      <router-link to="/foo" class="nav-link">FOO</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'app',
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    logoutUser() {
      const onResolve = function onResolve() {
        this.$router.push({ path: '/login' });
      };

      const onReject = function onReject(err) {
        // eslint-disable-next-line
        console.error(err);
      };

      firebase.auth().signOut().then(onResolve.bind(this), onReject);
    },
    syncRoute(path) {
      this.isLogin = (path === '/login');
      window.document.title = path;
    },
  },
  created() {
    this.syncRoute(this.$route.path);
  },
  watch: {
    $route(to) { // (to,from)
      this.syncRoute(to.path);
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

  font-size: 16px;
}
</style>

<style scoped>
nav {
  z-index: 9999;

  background-color: #000;
}

nav a, nav div {
  padding: 20px;

  display: inline-block;
  cursor: pointer;

  color: #fff;
  text-decoration: none;
}

nav .nav-link {
  float: right;
}
</style>
