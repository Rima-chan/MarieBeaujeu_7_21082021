<template>
    <main class="container">
        <div class="row">
            <h1 class="h2 mt-3">Fil d'actualités</h1>
            <div class="col-12 d-flex justify-content-center my-2">
                <create-publication-card />
            </div>
            <div class="col-12 d-flex flex-column align-items-center my-2">
                <h2 class="col-12 h4">Les dernières publications...</h2>
                <publication-card />
            </div>
        </div>
    </main>
</template>

<script>
// import { reactive, ref } from '@vue/runtime-core';
import CreatePublicationCard from './CreatePublicationCard.vue';
import PublicationCard from './PublicationCard.vue';
// import useFetchGet from '../composables/useFetchGet';
// import useAxiosHeaders from '../composables/useAxiosHeaders';

export default {
  components: { CreatePublicationCard, PublicationCard },
  name: 'AllPublications',
  setup() {
    // const result = reactive({
    //   publications: [],
    //   totalPages: 0,
    // });
    // const userToken = ref('');
    // const userRegistered = JSON.parse(localStorage.getItem('userRegistered'));
    // userToken.value = userRegistered.token;
    // const { authHeaders } = useAxiosHeaders();
    // const {
    //   status, data, error, loading,
    // } = useFetchGet('publications', authHeaders);
    // console.log(data);
    // console.log(error);
    // if (data) {
    //   console.log('ok');
    //   console.log(data.value.publications);
    // }
    // // watch(() => status, (statusValue) => {
    // //   if (statusValue === 200) {
    // //     result.publications = data.publications;
    // //     result.totalPages = data.totalPages;
    // //     console.log(result.publications);
    // //   }
    // // });
    // return {
    //   userToken,
    //   result,
    //   status,
    //   data,
    //   error,
    //   loading,
    // };
  },
};
</script>

<style>
</style>
