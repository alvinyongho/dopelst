<template>
  <div id="app">
    <nav>
      <router-link to="/" v-show="!isLogin">HOME</router-link>
      <div class="spacer">&nbsp;</div>
      <div class="nav-link" v-show="!isLogin" v-on:click="logoutUser">LOGOUT</div>
      <router-link to="/faq" class="nav-link" v-show="!isLogin">FAQ</router-link>
      <router-link to="/team" class="nav-link" v-show="!isLogin">TEAM</router-link>
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
      firebase.auth().signOut().then(
        () => this.$router.push({ path: '/login' }),
        // eslint-disable-next-line
        err => console.error(err),
      );
    },
    syncRoute(route) {
      this.isLogin = (route.path === '/login');
      document.title = (route.meta.title && route.meta.title(route.params)) || 'dopelst';
    },
  },
  created() {
    this.$router.push({ path: '/' });
    this.syncRoute(this.$route);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push({ path: '/playlist' });
      } else {
        this.$router.push({ path: '/login' });
      }
      this.syncRoute(this.$route);
    });
  },
  watch: {
    $route(to) { // (to,from)
      this.syncRoute(to);
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

<style lang="scss" scoped>


#app {
  height: 100%;
}

nav {
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  background-color: #000;
}

nav a, nav div {
  padding: 20px;

  display: inline-block;
  cursor: pointer;

  font-family: "Avenir", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.75em;
  color: #fff;
  text-decoration: none;
}

.nav-link:hover, nav a:hover {
  font-weight: bold;
}

nav .nav-link {
  float: right;
}

nav .spacer {
  cursor: default;
}
</style>
