<template>
  <div class="landing">
    <div class="v-center">
      <img src="../assets/dopLstlogo.png" alt="logo" class="logo" />
      <div class="tagline">MANAGE YOUR MUSIC IN ONE PLACE</div><!-- .tagline -->
      <div class="link" v-on:click="linkClicked">GET STARTED</div><!-- .link -->
    </div><!-- .v-center -->
  </div><!-- .landing -->
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'index',
  methods: {
    linkClicked() {
      if (firebase.auth().currentUser) {
        this.$router.push({ path: '/playlist' });
      } else {
        this.$router.push({ path: '/login' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.landing {
  width: 100%;
  height: 100%;

  position: relative;

  background-color:#F8CF39;
  filter:progid:DXImageTransform.Microsoft.gradient(GradientType=1,startColorstr=#F8CF39, endColorstr=#F76B1C);
  background-image:-moz-linear-gradient(right bottom, #F8CF39 0%, #F76B1C 48%,#5E007A 100%);
  background-image:linear-gradient(right bottom, #F8CF39 0%, #F76B1C 48%,#5E007A 100%);
  background-image:-webkit-linear-gradient(right bottom, #F8CF39 0%, #F76B1C 48%,#5E007A 100%);
  background-image:-o-linear-gradient(right bottom, #F8CF39 0%, #F76B1C 48%,#5E007A 100%);
  background-image:-ms-linear-gradient(right bottom, #F8CF39 0%, #F76B1C 48%,#5E007A 100%);
  background-image:-webkit-gradient(linear, right bottom, left top, color-stop(0%,#F8CF39), color-stop(48%,#F76B1C),color-stop(100%,#5E007A));

  text-align: center;

  .logo {
    width: 250px;
    max-width: 90%;
  }

  .tagline {
    color: rgba(255, 255, 255, 0.7);
  }

  .link {
    margin-top: 3em;
    padding: 0.75em 2em;

    display: inline-block;
    cursor: pointer;

    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 0.9em;
  }
}

.v-center {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
