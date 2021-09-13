<template lang="fr">
    <main class="container">
        <div class="row d-flex flex-column">
            <h1 class="h2 mt-3">Fil d'actualités</h1>
            <div class="col-12 col-md-10 col-lg-6 align-self-center d-flex my-2">
                <create-publication-card />
            </div>
            <div class="col-12 col-md-10 col-lg-5 align-self-center my-2">
                <h2 class="col-12 h4">Les dernières publications...</h2>
                <publication-card />
            </div>
        </div>
        <router-view />
    </main>
</template>

<script>
import CreatePublicationCard from './CreatePublicationCard.vue';
import PublicationCard from './PublicationCard.vue';

export default {
  components: { CreatePublicationCard, PublicationCard },
  name: 'AllPublications',
  setup() {
  },
};
</script>

<style>
</style>
