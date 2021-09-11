<template>
    <div class="row d-flex justify-content-center my-5">
      <div class="col-sm-6 col-md-4 d-flex flex-column">
        <div class="card">
          <div class="align-self-center rounded-circle bg-info logo_profil my-3">
           <img :src="data.imageUrl" class="img-fluid card-img-top rounded-circle" alt="">
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
            <update-profil-card v-if="userIdRegistered === data.id || isAdmin" />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import useAxiosHeaders from '../composables/useAxiosHeaders';
import useFetchGet from '../composables/useFetchGet';
import UpdateProfilCard from './UpdateProfilCard.vue';
import useUserInfos from '../composables/useUserInfos';

export default {
  components: { UpdateProfilCard },
  name: 'ProfilCard',
  setup() {
    // Handle navigatipon pages
    const route = useRoute();
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
    return {
      status,
      data,
      error,
      loading,
      userIdRegistered,
      isAdmin,
      userId,
    };
  },
};
</script>

<style scoped>
.logo_profil {
  max-width: 200px;
}
</style>
