<template>
    <main class="container">
        <div class="row">
            <h1 class="h2 mt-3">Fil d'actualités</h1>
            <div class="col-12 d-flex justify-content-center my-2">
                <create-publication-card />
            </div>
            <div class="col-12 d-flex flex-column align-items-center my-2">
                <h2 class="col-12 h4">Les dernières publications...</h2>
                <publication-card @getStatusCode="displayMessage" />
                <div>{{ noPublicationMessage }}</div>
            </div>
        </div>
        <router-view />
    </main>
</template>

<script>
import { ref } from '@vue/runtime-core';
import CreatePublicationCard from './CreatePublicationCard.vue';
import PublicationCard from './PublicationCard.vue';

export default {
  components: { CreatePublicationCard, PublicationCard },
  name: 'AllPublications',
  setup() {
    const noPublicationMessage = ref('');
    function displayMessage(statusCode) {
      console.log('Status ');
      console.log(statusCode);
    }
    return {
      displayMessage,
      noPublicationMessage,
    };
  },
};
</script>

<style>
</style>
