/* eslint-disable no-new */

import Vue from 'vue';
import VueFire from 'vuefire';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';
import App from './App';
import router from './router';


/* Vue App */

Vue.config.productionTip = false;
Vue.use(VueFire);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});


/* Service Worker */

const swEnabled = false;

if (
  // Enable toggle
  swEnabled &&
  // SW support
  'serviceWorker' in navigator &&
  // HTTPS or localhost
  (window.location.protocol === 'https:' || window.location.hostname === 'localhost')
) {
  window.addEventListener('load', () => {
    const registration = runtime.register({
      scope: '/',
      excludes: [
        '** /*.hot-update.*', // Webpack HMR files
      ],
    });

    registerEvents(registration, {
      // No SW when page loaded + SW 'activated' state
      onInstalled: () => {
        // console.log('onInstalled');

        // SW controller ready here
      },

      // Had SW when page loaded + SW 'installed' state
      onUpdateReady: () => {
        // console.log('onUpdateReady');
      },
      // Had SW when page loaded + SW 'installing' state
      onUpdating: () => {
        // console.log('onUpdating');
      },
      // Had SW when page loaded + SW 'redundant' state
      onUpdateFailed: () => {
        // console.log('onUpdateFailed');
      },
      // Had SW when page loaded + SW 'activated' state
      onUpdated: () => {
        // console.log('onUpdated');
      },
    });
  });
}
