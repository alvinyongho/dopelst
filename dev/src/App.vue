<template>
  <div id="app">
    <nav>
      <router-link to="/" v-show="!isLogin">HOME</router-link>
      <div class="spacer">&nbsp;</div>
      <div class="nav-link" v-show="!isLogin" v-on:click="logoutUser">LOGOUT</div>
      <!--
      <router-link to="/bar" class="nav-link" v-show="!isLogin">BAR</router-link>
      <router-link to="/foo" class="nav-link" v-show="!isLogin">FOO</router-link>
      -->
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase';

// const config = {
//   apiKey: 'AIzaSyAieH1g0trAjkHGDBbmuSV2iKPQXwTYz7Y',
//   authDomain: 'dopelst-a697d.firebaseapp.com',
//   databaseURL: 'https://dopelst-a697d.firebaseio.com',
//   storageBucket: 'dopelst-a697d.appspot.com',
//   messagingSenderId: '492354135751',
// };

// const app = firebase.initializeApp(config);
// const db = app.database();

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
      document.title = route.meta.title(route.params);
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push({ path: '/' });
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

<style scoped>
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

  color: #fff;
  text-decoration: none;
}

nav .nav-link {
  float: right;
}

nav .spacer {
  cursor: default;
}
</style>
