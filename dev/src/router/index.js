import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Login from '@/components/Login';
import Foo from '@/components/Foo';
import Bar from '@/components/Bar';

Vue.use(Router);

export default new Router({
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
  ],
});
