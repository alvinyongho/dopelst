<template>
  <div id="app">
    <nav id ="nav-desk" >
      <router-link to="/">
        <img src="./assets/dopLstlogo.png" alt="LOGO" id ="nav-logo" />
      </router-link>
      <div class="spacer">&nbsp;</div>
      <div class="nav-link" v-show="isUser" v-on:click="logoutUser">LOGOUT</div>
      <router-link to="/faq" class="nav-link" v-show="!isLogin">FAQ</router-link>
      <router-link to="/team" class="nav-link" v-show="!isLogin">TEAM</router-link>
    </nav>
    <div id="mobile-nav" class="sidenav" v-bind:style="{ width: navWidth }">
      <a href="javascript:void(0)" id="closebtn" v-on:click="closeNav">&times;</a>
        <div id="nav-elements" v-bind:style="{ display: mNavDisp }">
          <router-link to="/" class="nav-link" v-show="!isLogin">HOME</router-link>
          <br>
          <router-link to="/team" class="nav-link" v-show="!isLogin">TEAM</router-link>
          <br>
          <router-link to="/faq" class="nav-link" v-show="!isLogin" >FAQ</router-link>
          <br>
          <div class="nav-link" v-show="!isLogin" v-on:click="logoutUser">LOGOUT</div>
        </div><!-- #nav-elements -->
      
    </div><!-- #mobile-nav -->
    <nav id = "nav-mobile">
      <router-link to="/" v-show="!isLogin">
        <img src="./assets/dopLstlogo.png" alt="LOGO" id ="nav-logo" />
      </router-link>
      <div class="spacer">&nbsp;</div>
      <div id="menu-btn" class="nav-link" v-show="!isLogin" v-on:click="openNav">&#9776;</div>
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
      isIndex: false,
      isInfoPage: false,
      isUser: false,
      navWidth: 0,
      mNavDisp: 'none',
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
      this.isIndex = (route.path === '/');
      this.isInfoPage = (route.path === '/faq' || route.path === '/team');
      this.isUser = firebase.auth().currentUser;
      document.title = (route.meta.title && route.meta.title(route.params)) || 'dopelst';
    },
    openNav() {
      this.navWidth = '100%';
      this.mNavDisp = 'block';
    },
    closeNav() {
      this.navWidth = 0;
      this.mNavDisp = 'none';
    },
  },
  created() {
    this.$router.push({ path: '/' });
    this.syncRoute(this.$route);
  },
  watch: {
    $route(to) { // (to,from)
      this.closeNav();
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



.nav-link {
  padding: 1.4em;
}
nav a, nav div {
  display: inline-block;
  cursor: pointer;

  font-family: "Avenir", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.75em;
  color: #fff;
  text-decoration: none;
}

nav #nav-logo {
  height: 2em;
  padding: 1em;

  cursor: pointer;
}

nav a#nav-logo {
  padding: 0;
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

nav#nav-mobile {
  display: none;
}

/* Desktop Style */
@media only screen and (min-width: 501px) {
  #mobile-nav {
    display: none;
  }
}

/* mobile style*/
@media only screen and (max-width: 500px) {

  nav#nav-mobile {
    display: initial;
  }

  nav#desktop {
    display: none;
  }

  #mobile-nav {

    height: 100%;
    width: 0%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;

    background-color: #111;
    transition: 0.5s;

    z-index: 10000;


    #closebtn {
      float: right;
      text-decoration: none;
      color: rgba(255,255,255,0.5);
      font-size: 2.5em;
      padding-right: 10%;
      padding-top: 5%;

    }


    #nav-elements {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      transition: 0.3s;
      background-color: transparent;
      width: auto;
      top: 50%;
      transform: translateY(-50%);

      padding-left: 5%;


      .nav-link {
        float: left;
        display: block;
        position: relative;
        padding: 10px 10px;

        font-size: 2em;
        font-weight: bold;
        text-align: right;

          cursor: pointer;

          font-family: "Avenir", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 2em;
          color: #fff;
          text-decoration: none;
      }
    }


  }
}
</style>
