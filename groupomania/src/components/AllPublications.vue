<template>
    <main class="container">
        <div class="row">
            <h1 class="h2 mt-3">Fil d'actualités</h1>
            <div class="col-12 d-flex justify-content-center my-2">
                <create-publication-card />
            </div>
            <div class="col-12 d-flex justify-content-center my-2">
                <h2 class="h4">Les dernières publications...</h2>
            </div>
        </div>
    </main>
</template>

<script>
import CreatePublicationCard from './CreatePublicationCard.vue';

export default {
  components: { CreatePublicationCard },
  name: 'AllPublications',
};
</script>

<style>
</style>
