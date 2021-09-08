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
                            <text-field />
                            <input-file-field @imagePreviewUrl="displayImagePreview" />
                        </div>
                            <button type="submit" class="btn btn-outline-success rounded-pill" >Publier</button>
                    </form>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import InputFileField from './formFields/InputFileField.vue';
import TextField from './formFields/TextField.vue';

export default {
  components: { TextField, InputFileField },
  name: 'NewPublicationCard',
  setup() {
    function displayImagePreview(previewUrl) {
      console.log(previewUrl);
    }
    return {
      displayImagePreview,
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
