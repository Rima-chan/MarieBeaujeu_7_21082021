<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container p-0">
            <!-- <a class="navbar-brand" href="/accueil">
                <img src="../assets/logo-left-font-white.png" alt="Groupomania logo" class="img-fluid my-3 logo">
            </a> -->
            <router-link to="/accueil" aria-current="page">
                <img src="../assets/logo-left-font-white.png" alt="Groupomania logo" class="img-fluid my-3 logo">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBarHome" aria-controls="navBarHome" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navBarHome">
            <div class="navbar-nav">
                <!-- <router-link to="/accueil" aria-current="page" class="nav-link">Accueil</router-link> -->
                <router-link to="/publications" class="nav-link">9Gag'mania</router-link>
                <router-link :to="{ name: 'Profil', params: { userId: userIdRegistered }}" class="nav-link">Mon profil</router-link>
                <h6 @click="validateLogout" class="nav-link pointer mb-0">Déconnexion</h6>
            </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref, inject } from 'vue';
// import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useUserInfos from '../composables/useUserInfos';
// import { computed } from '@vue/runtime-dom';

export default {
  name: 'NavBar',
  setup() {
    const router = useRouter();
    const store = inject('store');
    const errorMessage = ref('');
    const {
      userId: userIdRegistered,
    } = useUserInfos();
    // const validateLogout = computed(() => {
    // })
    function validateLogout() {
      console.log('nav');
      store.methods.logout();
      router.push('/connexion');
      // console.log(store.userState);
    }
    return {
      store,
      errorMessage,
      userIdRegistered,
      validateLogout,
    };
  },
};
</script>

<style scoped>
.logo {
    max-width: 200px;
    max-height: 80px;
}
.pointer {
  cursor: pointer;
}
</style>
