<template>
    <main class="container">
        <div class="row">
            <div class="col-12 d-flex justify-content-center my-5">
                <create-publication-card />
            </div>
            <div class="col-12">
                Fil d'acutalité
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
