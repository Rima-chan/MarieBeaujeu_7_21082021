<template>
    <div>
        <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i class="fas fa-ellipsis-h"></i>
        </button>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modifiez votre publication 🙂</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent method="post" enctype="multipart/form-data">
                      <div class="d-flex mt-2">
                          <text-field v-model="title" />
                          <label
                            for="publication_file_update"
                            class="btn btn-outline-info border-none rounded-circle"
                            aria-label="Choisir une image">
                              <i class="fas fa-images"></i>
                              <input
                              type="file"
                              id="publication_file_update"
                              style="display:none"
                              accept="image/*"
                              @change="onFilePicked">
                          </label>
                      </div>
                      <div class="col-12 d-inline-flex justify-content-between align-items-center mt-2">
                        <span class="col-5">
                          <span v-if="validationMessage">{{ validationMessage }}</span>
                        </span>
                      </div>
                  </form>
                  <img :src="displayImagePreview" alt="" id="image" class="img-fluid">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-danger">
                      <i class="fas fa-trash-alt"></i>
                  </button>
                  <button type="submit" @click="submitted" class="btn btn-outline-success">Modifier</button>
                </div>
              </div>
            </div>
          </div>
    </div>
</template>

<script>
import { toRefs, ref } from '@vue/runtime-core';
import { onBeforeMount } from 'vue';
import TextField from './formFields/TextField.vue';

export default {
  components: { TextField },
  name: 'UpdatePublicationCard',
  props: {
    formerImage: String,
    content: String,
  },
  setup(props) {
    const imageUrl = ref('');
    onBeforeMount(() => {
      const { publication } = toRefs(props);
      imageUrl.value = publication;
    });
    const imageFile = ref('');
    function displayImagePreview(file) {
      imageUrl.value = URL.createObjectURL(file);
      imageFile.value = file;
    }
    return {
      props,
      imageUrl,
      displayImagePreview,
    };
  },
};
</script>

<style scoped>
</style>
