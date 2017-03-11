import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Hello from '@/components/Hello';
import Login from '@/components/Login';
import Foo from '@/components/Foo';
import Bar from '@/components/Bar';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/foo',
      name: 'Foo',
      component: Foo,
    },
    {
      path: '/bar',
      name: 'Bar',
      component: Bar,
    },
    {
      path: '/foo',
      name: 'Playlist',
      component: Foo,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !firebase.auth().currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
