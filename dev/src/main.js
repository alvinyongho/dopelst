// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';
import firebase from 'firebase';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyAieH1g0trAjkHGDBbmuSV2iKPQXwTYz7Y',
  authDomain: 'dopelst-a697d.firebaseapp.com',
  databaseURL: 'https://dopelst-a697d.firebaseio.com',
  storageBucket: 'dopelst-a697d.appspot.com',
  messagingSenderId: '492354135751',
};

firebase.initializeApp(config);

Vue.use(VueFire);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
