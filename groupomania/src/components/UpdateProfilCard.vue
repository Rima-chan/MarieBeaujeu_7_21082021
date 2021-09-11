<template>
    <form @submit.prevent method="post" enctype="multipart/form-data">
        <username-field
          v-if="userId === userIdRegistered"
          v-model="username" />
        <service-field
          v-if="userId === userIdRegistered"
          v-model="service" />
        <input-file-field
          v-if="userId === userIdRegistered"/>
        <img :src="imagePreviewUrl" alt="" id="image" style="width:100%" class="img-fluid">
        <span class="d-inline-flex justify-content-end mt-3 mb-2">
          <button
            v-if="userId === userIdRegistered || isAdmin"
            @click="deleteProfil"
            type="button"
            class="btn btn-outline-danger me-3" id="deleteProfilButton">
            <i class="fas fa-trash-alt"></i>
          </button>
          <button
            v-if="userId === userIdRegistered"
            type="submit"
            @click="updateProfil"
            class="btn btn-outline-success float-end rounded-pill">
            Modifier</button>
        </span>
    </form>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive } from '@vue/runtime-core';
import ServiceField from './formFields/ServiceField.vue';
import UsernameField from './formFields/UsernameField.vue';
import useAxiosHeaders from '../composables/useAxiosHeaders';
import useFetchDelete from '../composables/useFetchDelete';
import useFetchPut from '../composables/useFetchPut';
import useUserInfos from '../composables/useUserInfos';

export default {
  components: { UsernameField, ServiceField },
  name: 'UpdateProfilCard',
  setup() {
    // Handle page redirection
    const route = useRoute();
    const router = useRouter();
    // Get back infos from authentificated user
    const {
      userId: userIdRegistered, isAdmin,
    } = useUserInfos();
    // Get back params of user profil to display
    const userId = ref(null);
    userId.value = parseInt(route.params.userId, 10);
    console.log(userId.value === userIdRegistered.value);
    // Headers requests
    const { authHeaders, formDataAuthHeaders } = useAxiosHeaders();
    // UPDATE PROFIL
    const infosUpdated = reactive({
      username: '',
      service: '',
      imageUrl: '',
    });
    const {
      status: statusPut, data: dataPut, error: errorPut, loading: loadingPut, fetch: fetchPut,
    } = useFetchPut(`users/${userId.value}`, infosUpdated, formDataAuthHeaders);
    const updateProfil = async () => {
      console.log(infosUpdated);
    };
    // DELETE PROFIL
    // Choose request headers and get back reactives data and fetchDelete function
    const {
      status: statusDelete, data: dataDelete, error: errorDelete, loading: loadingDelete, fetch: fetchDelete,
    } = useFetchDelete(`users/${userId.value}`, authHeaders);
    // After confirmation, delete profil, clean localStorage and logout user (expect for Admin)
    function deleteProfil() {
      if (window.confirm('Etes-vous sur de vouloir supprimer ce compte ?')) {
        console.log(isAdmin.value);
        if (isAdmin.value && userId.value !== userIdRegistered.value) {
          fetchDelete();
          router.push('/accueil');
        } else {
          localStorage.removeItem('xsrfToken');
          localStorage.removeItem('userRegistered');
          fetchDelete();
          router.push('/');
        }
      }
    }
    const validationMessage = ref('');
    return {
      updateProfil,
      statusPut,
      dataPut,
      errorPut,
      loadingPut,
      fetchPut,
      deleteProfil,
      statusDelete,
      dataDelete,
      errorDelete,
      loadingDelete,
      fetchDelete,
      validationMessage,
      userIdRegistered,
      isAdmin,
      userId,
    };
  },
};
</script>

<style>
</style>
