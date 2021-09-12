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
            </div>
            <div class="col-12 d-flex flex-column justify-content-center px-3">
                <form @submit.prevent method="post" enctype="multipart/form-data">
                  <div class="order-sm-1">
                    <text-field v-model="title"/>
                  </div>
                    <input-file-field @getImageFile="displayImagePreview" :inputFieldId="new_publication_file" />
                  <img :src="imagePreviewUrl" alt="" id="image" class="img-fluid">
                  <div class="col-12 d-inline-flex justify-content-between align-items-center mt-2">
                    <span class="col-5">
                      <span v-if="validationMessage">{{ validationMessage }}</span>
                    </span>
                    <button type="submit" @click="submitted" class="btn btn-outline-success float-end rounded-pill">Publier</button>
                  </div>
               </form>
            </div>
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
  computed,
} from 'vue';
import { useRouter } from 'vue-router';
// import { computed } from '@vue/runtime-core';
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
      userId: userIdRegistered,
    } = useUserInfos();
    //
    const pseudo = computed(() => (store.userState.userInfos.username));
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
        validationMessage.value = 'Message publié !🌞';
        router.go(0);
      } else {
        imagePreviewUrl.value = '';
        title.value = '';
        errorMessage.value = 'Désolé nous n\'avons pas pu poster votre message 😥';
      }
    });
    return {
      store,
      pseudo,
      userIdRegistered,
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
