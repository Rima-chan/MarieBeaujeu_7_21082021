<template>
  <div>
    <form @submit.prevent method="post" enctype="multipart/form-data">
        <username-field
          v-if="userId === userIdRegistered"
          v-model="username" />
        <service-field
          v-if="userId === userIdRegistered"
          v-model="service" />
        <span>
        <label
          for="updateProfilPicture"
          class="btn btn-outline-info border-none rounded-circle"
          aria-label="Choisir une nouvelle image de profil">
            <i class="fas fa-images"></i>
            <input
             type="file"
             id="updateProfilPicture"
             style="display:none"
             accept="image/*"
             @change="pickNewPicture" >
        </label>
        <!-- <img :src="imagePreviewSrc" alt="" id="image" style="width:100%"> -->
        </span>
        <span class="d-inline-flex justify-content-end mt-3 mb-2">
          <button
            v-if="userId === userIdRegistered || isAdmin"
            @click="deleteProfil"
            type="button"
            class="btn btn-outline-danger mx-3" id="deleteProfilButton">
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
  </div>
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
  setup(props, context) {
    // Handle page redirection
    const route = useRoute();
    const router = useRouter();
    // Authentificated user infos
    const {
      userId: userIdRegistered, isAdmin,
    } = useUserInfos();
    // Recover params of user profil to display
    const userId = ref(null);
    userId.value = parseInt(route.params.userId, 10);
    // UPDATE PROFIL
    const { authHeaders, formDataAuthHeaders } = useAxiosHeaders();
    const infosUpdated = reactive({
      username: '',
      service: '',
      imageUrl: '',
    });
    const imageFile = ref('');
    function pickNewPicture(event) {
      console.log('Helo');
      console.log(event);
      const file = event.target.files[0];
      console.log(file);
      // TODO : ajouter des règles de vérifications (Si file alors.., longueur, poids...)
      if (file) {
        imageFile.value = file;
        console.log(imageFile.value);
        context.emit('getImageProfilFile', file);
      }
    }
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
    } = useFetchDelete('users', authHeaders);
    // After confirmation, delete profil, clean localStorage and logout user (expect for Admin)
    function deleteProfil() {
      if (window.confirm('Etes-vous sur de vouloir supprimer ce compte ?')) {
        console.log(isAdmin.value);
        if (isAdmin.value && userId.value !== userIdRegistered.value) {
          fetchDelete(userId.value);
          router.push('/accueil');
        } else {
          localStorage.removeItem('xsrfToken');
          localStorage.removeItem('userRegistered');
          fetchDelete(userId.value);
          router.push('/');
        }
      }
    }
    const validationMessage = ref('');
    return {
      updateProfil,
      pickNewPicture,
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

<style scoped>
.image_preview {
  max-width: 200px;
}
</style>
