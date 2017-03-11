import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Login from '@/components/Login';
import Playlist from '@/components/Playlist';
import PlaylistDetail from '@/components/Playlist-Detail';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/playlist',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/playlist',
      name: 'Playlist',
      component: Playlist,
    },
    {
      path: '/playlist/:id',
      name: 'Playlist-Detail',
      component: PlaylistDetail,
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
