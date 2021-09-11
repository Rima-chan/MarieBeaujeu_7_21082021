<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="../assets/logo-left-font-white.png" alt="Groupomania logo" class="img-fluid my-3 logo">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBarHome" aria-controls="navBarHome" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navBarHome">
            <div class="navbar-nav">
                <router-link to="/accueil" aria-current="page" class="nav-link">Accueil</router-link>
                <router-link to="/publications" class="nav-link">9Gag'mania</router-link>
                <router-link :to="{ name: 'Profil', params: { userId: userIdRegistered }}" class="nav-link">Mon profil</router-link>
            </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref } from '@vue/runtime-core';
import useUserInfos from '../composables/useUserInfos';

export default {
  name: 'NavBar',
  setup() {
    const errorMessage = ref('');
    const {
      userId: userIdRegistered,
    } = useUserInfos();
    return {
      errorMessage,
      userIdRegistered,
    };
  },
};
</script>

<style scoped>
.logo {
    max-width: 200px;
    max-height: 80px;
}
</style>
