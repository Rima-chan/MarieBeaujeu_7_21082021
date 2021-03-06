<template>
    <div class="card flex-grow-1 align-self-center">
        <div class="card-body shadow-sm pb-0">
          <div class="row">
            <h2 class="h5 card-title col-12 text-start border-bottom pb-2">Créer une publication &#128512;</h2>
          </div>
          <div class="row mb-3">
            <div class="col-12 d-inline-flex align-items-center mb-3 px-3">
              <span class="rounded-circle shadow-sm logo-profil-container me-3">
                <img :src="imageProfil" width="40" height="40" class="img-fluid rounded-circle" alt="Logo du profil">
              </span>
              <span>
                {{ username }}
              </span>
            </div>
            <div class="d-flex flex-column px-2">
                <form @submit.prevent method="post" enctype="multipart/form-data">
                  <div class="order-sm-1 flex-grow-1">
                    <text-field v-model="title" :inputId="timeStamp"/>
                  </div>
                  <img v-if="imagePreviewUrl" :src="imagePreviewUrl" alt="" id="image" class="img-fluid">
                  <div class="d-flex justify-content-between mt-3 px-2">
                    <div class="order-sm-2">
                      <input-file-field @getImageFile="displayImagePreview" />
                    </div>
                    <div class="order-sm-3">
                      <button type="submit" @click="submitted" class="btn btn-outline-success float-end rounded-pill" aria-label="Publier">Publier</button>
                    </div>
                    </div>
                </form>
            </div>
            <span class="mt-3" v-if="validationMessage">{{ validationMessage }}</span>
          </div>
          <error-display :isError="status && status != 201" :status="status" :error="errorMessage" />
        </div>
    </div>
</template>

<script>
import {
  ref,
  watch,
  inject,
} from 'vue';
import { useRouter } from 'vue-router';
import { computed } from '@vue/runtime-core';
// import { reactive } from '@vue/runtime-core';
import InputFileField from './formFields/InputFileField.vue';
import TextField from './formFields/TextField.vue';
import useFetchPost from '../composables/useFetchPost';
import useAxiosHeaders from '../composables/useAxiosHeaders';
import ErrorDisplay from './ErrorDisplay.vue';
import useUserInfos from '../composables/useUserInfos';

export default {
  components: { TextField, InputFileField, ErrorDisplay },
  name: 'NewPublicationCard',
  setup() {
    // Variables
    const store = inject('store');
    const router = useRouter();
    const errorMessage = ref('');
    const validationMessage = ref('');
    // Will store new publication infos
    const imagePreviewUrl = ref('');
    const imageFile = ref('');
    const title = ref('');
    // Authentificated user infos
    const {
      userId: userIdRegistered, imageProfil, username,
    } = useUserInfos();
    // Display image input
    function displayImagePreview(file) {
      imagePreviewUrl.value = URL.createObjectURL(file);
      imageFile.value = file;
    }
    // Create form data which will be sent to backend
    const formData = new FormData();
    formData.append('userId', userIdRegistered.value);
    watch(() => imageFile.value, (imageValue) => {
      formData.append('imageUrl', imageValue);
    });
    // TODO : gestion erreur champs vide
    watch(() => title.value, (titleValue) => {
      formData.set('title', titleValue);
    });
    // CREATE publication
    // timeStamp to give unique id to html input/label
    const timeStamp = computed(() => Date.now());
    const { formDataAuthHeaders } = useAxiosHeaders();
    const {
      status, data, error, loading, fetch,
    } = useFetchPost('publications', formData, formDataAuthHeaders);
    const submitted = async () => {
      fetch();
    };
    // Check updates on request status and send a message
    watch(() => status.value, (value) => {
      if (value === 201) {
        imagePreviewUrl.value = '';
        title.value = '';
        validationMessage.value = 'Message publié ! 🌞';
        router.go(0);
      } else {
        imagePreviewUrl.value = '';
        title.value = '';
        errorMessage.value = 'Impossible de pposter la publication 🤷';
      }
    });
    return {
      store,
      userIdRegistered,
      imageProfil,
      username,
      displayImagePreview,
      imagePreviewUrl,
      formDataAuthHeaders,
      formData,
      title,
      imageFile,
      submitted,
      status,
      error,
      loading,
      fetch,
      data,
      validationMessage,
      errorMessage,
      timeStamp,
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
