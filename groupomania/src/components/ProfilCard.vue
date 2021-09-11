<template>
    <div class="row d-flex justify-content-center my-5">
      <div v-if="!error" class="col-sm-6 col-md-4 d-flex flex-column">
        <div class="card">
          <div class="align-self-center rounded-circle bg-info logo_profil my-3">
           <img :src="imagePreviewUrl ? imagePreviewUrl : data.imageUrl" class="img-fluid card-img-top rounded-circle" alt="Image du profil">
          </div>
          <div class="border-top">
            <h5 class="mt-3">{{ data.username }}</h5>
            <p class="m-0">Service {{ data.service }}</p>
            <br>
            <p
              v-if="userIdRegistered === userId"
              class="text-start fw-light fst-italic m-0 ms-4">{{ data.email }}</p>
          </div>
          <div class="mx-3">
            <update-profil-card @getImageProfilFile="displayNewPicture" v-if="userIdRegistered === data.id || isAdmin" />
          </div>
          <div class="image_preview_container align-self-center">
            <img src="../assets/404.jpeg" alt="Nouvelle photo de profil" id="image" class="img-fluid rounded-circle image_preview">
          </div>
        </div>
      </div>
      <div v-if="status === 404 || status === 400">
        <page-not-found />
      </div>
    </div>
</template>

<script>
import { ref } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import useAxiosHeaders from '../composables/useAxiosHeaders';
import useFetchGet from '../composables/useFetchGet';
import UpdateProfilCard from './UpdateProfilCard.vue';
import useUserInfos from '../composables/useUserInfos';
import PageNotFound from '../views/PageNotFound.vue';

export default {
  components: { UpdateProfilCard, PageNotFound },
  name: 'ProfilCard',
  setup() {
    // Handle navigatipon pages
    const route = useRoute();
    const router = useRouter();
    const userId = ref(null);
    // Get back infos from authentificated user
    const {
      userId: userIdRegistered, isAdmin,
    } = useUserInfos();
    // Get back infos from profil page
    userId.value = parseInt(route.params.userId, 10);
    // Get back authentification headers, reactives data from fetch and fetch function
    const { authHeaders } = useAxiosHeaders();
    const {
      status, data, error, loading,
    } = useFetchGet(`users/${userId.value}`, authHeaders);
    if (status.value === 404) {
      console.log('OK');
    }
    const imagePreviewUrl = ref('');
    function displayNewPicture(file) {
      imagePreviewUrl.value = URL.createObjectURL(file);
      console.log(imagePreviewUrl);
    }
    function profilNotFound() {
      router.push('/404');
    }
    return {
      displayNewPicture,
      imagePreviewUrl,
      status,
      data,
      error,
      loading,
      userIdRegistered,
      isAdmin,
      userId,
      profilNotFound,
    };
  },
};
</script>

<style scoped>
.logo_profil {
  max-width: 200px;
  max-height:300px;
}
.image_preview_container {
  max-width: 200px;
}

</style>
