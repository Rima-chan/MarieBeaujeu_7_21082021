<template>
  <div>
    <form @submit.prevent enctype="multipart/form-data">
        <username-field
          v-if="userId === userIdRegistered"
          v-model="infosUpdated.username" />
        <service-field
          v-if="userId === userIdRegistered"
          v-model="infosUpdated.service" />
        <span>
          <div class="image_preview_container align-self-center">
            <img :src="imagePreviewUrl" v-if="imagePreviewUrl" alt="Nouvelle photo de profil" id="image" width="200" class="img-fluid rounded-circle image_preview">
          </div>
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
import { ref, reactive, watch } from '@vue/runtime-core';
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
    const imagePreviewUrl = ref('');
    function pickNewPicture(event) {
      const file = event.target.files[0];
      if (file) {
        infosUpdated.imageUrl = file;
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreviewUrl.value = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        console.log(imagePreviewUrl);
      }
    }
    const formData = new FormData();
    formData.append('userId', userIdRegistered.value);
    watch(() => infosUpdated.imageUrl, (image) => {
      formData.append('imageUrl', image);
    });
    watch(() => infosUpdated.service, (service) => {
      formData.set('service', service);
    });
    watch(() => infosUpdated.username, (username) => {
      formData.set('username', username);
    });
    const {
      status: statusPut, data: dataPut, error: errorPut, loading: loadingPut, fetch: fetchPut,
    } = useFetchPut(`users/${userIdRegistered.value}`, formData, formDataAuthHeaders);
    const updateProfil = async () => {
      console.log(infosUpdated);
      fetchPut();
      console.log(dataPut);
    };
    // DELETE PROFIL
    // Choose request headers and get back reactives data and fetchDelete function
    const {
      status: statusDelete, error: errorDelete, loading: loadingDelete, fetch: fetchDelete,
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
      errorDelete,
      loadingDelete,
      fetchDelete,
      validationMessage,
      userIdRegistered,
      isAdmin,
      userId,
      imagePreviewUrl,
      infosUpdated,
    };
  },
};
</script>

<style scoped>
.image_preview {
  max-width: 200px;
}
</style>
