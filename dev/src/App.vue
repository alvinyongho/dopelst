<template>
  <div id="app">
    <nav>
      <router-link to="/">HOME</router-link><!--
      --><router-link to="/foo" class="nav-link">FOO</router-link><!--
      --><router-link to="/bar" class="nav-link">BAR</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
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
