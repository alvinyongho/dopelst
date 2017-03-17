import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

import Index from '@/components/Index';
import Login from '@/components/Login';
import Playlist from '@/components/Playlist';
// import PlaylistDetail from '@/components/Playlist-Detail';
// import Faq from '@/components/Faq';
// import Team from '@/components/Team';

// const Index = () => System.import('@/components/Index');
// const Login = () => System.import('@/components/Login');
// const Playlist = () => System.import('@/components/Playlist');
const PlaylistDetail = () => System.import('@/components/Playlist-Detail');
const Faq = () => System.import('@/components/Faq');
const Team = () => System.import('@/components/Team');

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title() {
          return 'dopelst';
        },
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title() {
          return 'Login | dopelst';
        },
      },
    },
    {
      path: '/playlist',
      name: 'Playlist',
      component: Playlist,
      meta: {
        title() {
          return 'Playlists | dopelst';
        },
      },
    },
    {
      path: '/playlist/:id',
      name: 'Playlist-Detail',
      component: PlaylistDetail,
      meta: {
        title(params) {
          return `${params.name} | dopelst`;
        },
      },
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: Faq,
      meta: {
        title() {
          return 'FAQ | dopelst';
        },
      },
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
      meta: {
        title() {
          return 'Team | dopelst';
        },
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!firebase.auth().currentUser && to.path !== '/' && to.path !== '/login' && to.path !== '/faq' && to.path !== '/team') {
    next('/login');
  } else if (firebase.auth().currentUser && to.path === '/') {
    next('/playlist');
  } else {
    next();
  }
});

export default router;
