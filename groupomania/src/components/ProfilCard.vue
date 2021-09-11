<template>
    <div class="row d-flex justify-content-center my-5">
      <div class="col-sm-6 col-md-4 d-flex flex-column">
        <div class="card">
          <span class="align-self-end mt-2 me-2">
            <button
              @click="showForm"
              class="btn btn-outline-info">
              <i class="fas fa-pen"></i>
            </button>
          </span>
          <div class="align-self-center rounded-circle bg-info logo_profil mb-3">
           <img :src="data.imageUrl" class="img-fluid card-img-top rounded-circle" alt="">
          </div>
          <div class="border-top">
            <h5 class="mt-3">{{ data.username }}</h5>
            <p>Service {{ data.service }}</p>
          </div>
          <div class="mx-3" v-if="true">
            <update-profil-card />
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

export default {
  components: { UpdateProfilCard },
  name: 'ProfilCard',
  setup() {
    const route = useRoute();
    const userId = ref(null);
    const isDisplay = ref(false);
    userId.value = route.params.userId;
    const { authHeaders } = useAxiosHeaders();
    const {
      status, data, error, loading,
    } = useFetchGet(`users/${userId.value}`, authHeaders);
    console.log(data);
    function showForm() {
      isDisplay.value = true;
    }
    return {
      status,
      data,
      error,
      loading,
      isDisplay,
      showForm,
    };
  },
};
</script>

<style scoped>
.logo_profil {
  max-width: 200px;
}
</style>
