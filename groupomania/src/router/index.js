import { createRouter, createWebHistory } from 'vue-router';
// import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Authentification',
    component: () => import(/* webpackChunkName: "about" */ '../views/Authentification.vue'),
    children: [{
      path: 'inscription',
      component: () => import(/* webpackChunkName: "about" */ '../components/SignupForm.vue'),
    }, {
      path: 'connexion',
      component: () => import(/* webpackChunkName: "about" */ '../components/LoginForm.vue'),
    }],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
