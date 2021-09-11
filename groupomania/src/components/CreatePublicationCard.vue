<template>
    <div class="card col-lg-6">
        <div class="card-body shadow-sm pb-0">
          <div class="row">
            <h5 class="card-title col-12 text-start border-bottom pb-2">Créer une publication &#128512;</h5>
          </div>
          <div class="row mb-3">
            <div class="col-12 d-inline-flex align-items-center mb-2 px-3">
              <span class="rounded-circle shadow-sm logo-profil-container me-3">
                <img src="http://localhost:3000/images/avatar_user.png" width="40" height="40" class="img-fluid rounded-circle" alt="Logo du profil">
              </span>
              <span>Pseudo</span>
            </div>
            <div class="col-12 d-flex flex-column justify-content-center px-3">
              <div class="">
                <form @submit.prevent method="post" enctype="multipart/form-data">
                  <div class="d-flex mt-2">
                      <text-field v-model="title"/>
                      <input-file-field @getImageFile="displayImagePreview" inputFieldId="new_publication_file" />
                  </div>
                  <img :src="imagePreviewUrl" alt="" id="image" style="width:100%" class="img-fluid">
                  <div class="col-12 d-inline-flex justify-content-between align-items-center mt-2">
                    <span class="col-5">
                      <span v-if="validationMessage">{{ validationMessage }}</span>
                    </span>
                    <button type="submit" @click="submitted" class="btn btn-outline-success float-end rounded-pill">Publier</button>
                  </div>
               </form>
              </div>
            </div>
          </div>
          <error-display :isError="status && status != 201" :status="status" :error="errorMessage" />
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
// import { computed } from '@vue/runtime-core';
// import { reactive } from '@vue/runtime-core';
import InputFileField from './formFields/InputFileField.vue';
import TextField from './formFields/TextField.vue';
import useFetchPost from '../composables/useFetchPost';
import useAxiosHeaders from '../composables/useAxiosHeaders';
import ErrorDisplay from './ErrorDisplay.vue';

export default {
  components: { TextField, InputFileField, ErrorDisplay },
  name: 'NewPublicationCard',
  setup() {
    const router = useRouter();
    const errorMessage = ref('');
    const validationMessage = ref('');
    const imagePreviewUrl = ref('');
    const imageFile = ref('');
    const title = ref('');
    const userRegisteredInLocalSotrage = JSON.parse(localStorage.getItem('userRegistered'));
    if (!userRegisteredInLocalSotrage) {
      errorMessage.value = 'Désolé, nous ne pouvons pas publier la publication'; // Ajouter un break ?
    }
    function displayImagePreview(file) {
      imagePreviewUrl.value = URL.createObjectURL(file);
      imageFile.value = file;
    }
    const formData = new FormData();
    watch(() => imageFile.value, (imageValue) => {
      formData.append('imageUrl', imageValue);
    });
    // TODO : gestion erreur champs vide
    watch(() => title.value, (titleValue) => {
      formData.set('title', titleValue);
    });
    formData.append('userId', userRegisteredInLocalSotrage.userId);
    const { formDataAuthHeaders } = useAxiosHeaders();
    const {
      status, data, error, loading, fetch,
    } = useFetchPost('publications', formData, formDataAuthHeaders);
    const submitted = async () => {
      fetch();
    };
    watch(() => status.value, (value) => {
      if (value === 201) {
        console.log('Okkkk');
        console.log(data);
        imagePreviewUrl.value = '';
        title.value = '';
        validationMessage.value = 'Message publié !🌞';
        router.go(0);
      } else {
        imagePreviewUrl.value = '';
        title.value = '';
        errorMessage.value = 'Désolé nous n\'avons pas pu poster votre message 😥';
      }
    });
    return {
      displayImagePreview,
      imagePreviewUrl,
      formData,
      title,
      imageFile,
      submitted,
      formDataAuthHeaders,
      status,
      error,
      loading,
      fetch,
      data,
      validationMessage,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.logo-profil-container {
    width: 40px;
    height: 40px;
}
</style>
