import { createRouter, createWebHistory } from 'vue-router';
import useUserInfo from '../composables/useUserInfos';

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
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true },
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
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log(('coucou'));
    const { userId } = useUserInfo();
    if (!userId?.value) {
      next({
        path: '/connexion',
      });
    } else {
      next();
    }
  }
  console.log(from);
  console.log(next);
  next();
});

export default router;
