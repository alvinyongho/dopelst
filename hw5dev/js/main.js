Vue.use(VueRouter)

/* Route Components */

var Home = { template: '<div>home</div>' }
var Foo = { template: '<div>foo</div>' }
var Bar = { template: '<div>bar</div>' }

var router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})

/* Mount Root Instance */

window.onload = function() {
  new Vue({
    router: router,
    template: 
      '<div id="app">' +
        '<h1>Basic</h1>' +
        '<ul>' +
          '<li><router-link to="/">/</router-link></li>' +
          '<li><router-link to="/foo">/foo</router-link></li>' +
          '<li><router-link to="/bar">/bar</router-link></li>' +
        '</ul>' +
        '<router-view class="view"></router-view>' +
      '</div>'
  }).$mount('#root');
};
