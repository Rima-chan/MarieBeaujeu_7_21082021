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
                <a class="nav-link" v-bind:class="[activeNavLink === 1 ? active: '']" aria-current="page" href="/accueil">Accueil</a>
                <a class="nav-link" v-bind:class="[activeNavLink === 2 ? active: '']" href="/publications">9Gag'mania</a>
                <a class="nav-link" v-bind:class="[activeNavLink === 3 ? active: '']" href="/">Mon profil</a>
            </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    activeNavLink: Number,
  },
};
</script>

<style scoped>
.logo {
    max-width: 200px;
    max-height: 80px;
}
</style>
