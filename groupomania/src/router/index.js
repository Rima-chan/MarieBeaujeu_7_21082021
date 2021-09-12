import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Authentification',
    component: () => import(/* webpackChunkName: "Authentification" */ '../views/Authentification.vue'),
    children: [{
      path: 'inscription',
      component: () => import(/* webpackChunkName: "Inscription" */ '../components/SignupForm.vue'),
    }, {
      path: 'connexion',
      component: () => import(/* webpackChunkName: "Connexion" */ '../components/LoginForm.vue'),
    }],
  },
  {
    path: '/accueil',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/publications',
    name: 'Publications',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "publications" */ '../views/PublicationsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profil/:userId',
    name: 'Profil',
    props: true,
    component: () => import(/* webpackChunkName: "profil" */ '../views/ProfilView.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: () => import(/* webpackChunkName: "profil" */ '../views/PageNotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.userState.userInfos) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
    console.log('meta');
  } else {
    next();
  }
  // if (to.meta.requiresAuth && !store.userState) {
  //   next({ name: 'connexion' });
  // } else if (to.meta.requiresAuth && store.userState) {
  //   next({ name: 'Home' });
  // } else {
  //   next();
  // }
});

export default router;
