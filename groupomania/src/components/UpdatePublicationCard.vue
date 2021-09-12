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
                          <text-field />
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
                              @change="getImageFile">
                          </label>
                      </div>
                      opssss
                  </form>
                  {{ fileName }}
                </div>
                <div class="modal-footer">
                  <button type="button" @click="deletePublication" class="btn btn-outline-danger">
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
import { ref, toRefs } from '@vue/runtime-core';
import TextField from './formFields/TextField.vue';
import useFetchDelete from '../composables/useFetchDelete';
import useUserInfos from '../composables/useUserInfos';
import useAxiosHeader from '../composables/useAxiosHeaders';

export default {
  components: { TextField },
  name: 'UpdatePublicationCard',
  props: {
    postId: Number,
  },
  setup(props) {
    const imageUrl = ref('');
    const fileName = ref('');
    function getImageFile(event) {
      const file = event.target.files[0];
      if (file) {
        fileName.value = file.name;
      }
      imageUrl.value = file;
    }
    // Authentificated user infos
    const {
      userId: userIdRegistered, isAdmin,
    } = useUserInfos();
    // Requestes headers
    const { authHeaders } = useAxiosHeader();
    // DELETE publication
    const { postId } = toRefs(props);
    console.log(postId);
    const {
      status: statusDelete, error: errorDelete, loading: loadingDelete, fetch: fetchDelete,
    } = useFetchDelete('users', authHeaders);
    function deletePublication() {
      console.log(postId.value);
      // if (window.confirm('Etes-vous sur de vouloir supprimer cette publication ?')) {
      //   fetchDelete(parseInt(postId.value, 10));
      //   // router.push('/publications');
      // }
    }
    return {
      fileName,
      imageUrl,
      getImageFile,
      userIdRegistered,
      isAdmin,
      deletePublication,
      statusDelete,
      errorDelete,
      loadingDelete,
      fetchDelete,
    };
  },
};
</script>

<style scoped>
</style>
