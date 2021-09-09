<template>
    <div class="card col-lg-6">
        <div class="card-body shadow-sm">
            <h5 class="card-title text-start border-bottom pb-2">Créer une publication &#128512;</h5>
            <div class="d-flex align-items-center">
                <span class="rounded-circle shadow-lg logo-profil-container align-self-start me-3 mt-2">
                    <img src="http://localhost:3000/images/avatar_user.png" width="40" height="40" class="img-fluid rounded-circle" alt="Logo du profil">
                </span>
                <span class="flex-grow-1">
                    <form @submit.prevent method="post" enctype="multipart/form-data">
                        <div class="d-flex mt-2">
                            <text-field v-model="title"/>
                            <input-file-field @getImageFile="displayImagePreview" />
                        </div>
                        <img :src="ImagePreviewUrl" alt="" id="image" style="width:100%">
                        <button type="submit" @click="submitted" class="btn btn-outline-success rounded-pill float-end mt-3">Publier</button>
                    </form>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import InputFileField from './formFields/InputFileField.vue';
import TextField from './formFields/TextField.vue';
import useFetchPost from '../composables/useFetchPost';
import useAxiosHeaders from '../composables/useAxiosHeaders';

export default {
  components: { TextField, InputFileField },
  name: 'NewPublicationCard',
  setup() {
    const errorMessage = ref('');
    const ImagePreviewUrl = ref(''); // Nom plus explicite ?
    const image = ref('');
    const title = ref('');
    const userRegisteredInLocalSotrage = JSON.parse(localStorage.getItem('userRegistered'));
    if (!userRegisteredInLocalSotrage) {
      errorMessage.value = 'Désolé, nous ne pouvons pas publier la publication'; // Ajouter un break ?
    }
    function displayImagePreview(file) {
      ImagePreviewUrl.value = URL.createObjectURL(file);
      image.value = file;
    }
    const newPublication = new FormData();
    watch(() => image.value, (imageValue) => {
      newPublication.append('imageUrl', imageValue);
    });
    watch(() => title.value, (titleValue) => {
      newPublication.set('title', titleValue);
    });
    newPublication.append('userId', userRegisteredInLocalSotrage.userId);
    const { formDataAuthHeaders } = useAxiosHeaders(userRegisteredInLocalSotrage.token);
    const {
      status, data, error, loading, fetch,
    } = useFetchPost('publications', newPublication, formDataAuthHeaders);
    const submitted = async () => {
      fetch();
      console.log(error);
    };
    return {
      displayImagePreview,
      ImagePreviewUrl,
      newPublication,
      title,
      image,
      submitted,
      status,
      data,
      error,
      loading,
      fetch,
      formDataAuthHeaders,
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
