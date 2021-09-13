<template>
    <div>
        <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" >
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
                          <text-field v-model="publicationUpdated.content" />
                          <label
                            for="publication_file_update"
                            class="btn btn-outline-info border-none rounded-circle input_label"
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
                  </form>
                  {{ fileName }}
                </div>
                <div class="alert alert-info" role="alert">
                  Modification de la publication pas encore disponible...
                </div>
                <div class="modal-footer">
                  <button type="button" @click="deletePublication" class="btn btn-outline-danger">
                      <i class="fas fa-trash-alt"></i>
                  </button>
                  <button type="submit" @click="updatePublication" class="btn btn-outline-success">Modifier</button>
                </div>
              </div>
            </div>
          </div>
    </div>
</template>

<script>
import {
  ref,
  toRefs,
  watch,
  reactive,
} from 'vue';
import { useRouter } from 'vue-router';
import TextField from './formFields/TextField.vue';
import useFetchDelete from '../composables/useFetchDelete';
import useFetchPut from '../composables/useFetchPut';
import useUserInfos from '../composables/useUserInfos';
import useAxiosHeader from '../composables/useAxiosHeaders';

export default {
  components: { TextField },
  name: 'UpdatePublicationCard',
  props: {
    postId: Number,
  },
  setup(props) {
    const router = useRouter();
    const fileName = ref('');
    const publicationUpdated = reactive({
      imageUrl: null,
      content: null,
    });
    // const fileName = ref('');
    // const title = ref('');
    function getImageFile(event) {
      const file = event.target.files[0];
      if (file) {
        fileName.value = file.name;
      }
      publicationUpdated.imageUrl = file;
    }
    // Authentificated user infos
    const {
      userId: userIdRegistered, isAdmin,
    } = useUserInfos();
    // Requestes headers
    const { authHeaders, formDataAuthHeaders } = useAxiosHeader();
    const { postId } = toRefs(props);
    // UPDATE publication
    const formData = new FormData();
    formData.append('userId', userIdRegistered.value);
    watch(() => publicationUpdated.imageUrl, (image) => {
      formData.append('imageUrl', image);
    });
    watch(() => publicationUpdated.content, (content) => {
      formData.set('title', content);
    });
    const {
      status: statusPut, data: dataPut, error: errorPut, loading: loadingPut, fetch: fetchPut,
    } = useFetchPut(`publications/${postId.value}`, formData, formDataAuthHeaders);
    const updatePublication = () => {
      fetchPut();
      console.log(dataPut?.value);
    };
    // DELETE publication
    const {
      status: statusDelete, error: errorDelete, loading: loadingDelete, fetch: fetchDelete,
    } = useFetchDelete('publications', authHeaders);
    function deletePublication() {
      if (window.confirm('Sur de vouloir supprimer cette publication ?')) {
        fetchDelete(parseInt(postId.value, 10));
        console.log(errorDelete);
      }
      watch([loadingDelete], () => {
        if (statusDelete.value === 200) {
          console.log('OK delete');
          router.go(0);
        }
      });
      // fetchDelete(postId.value);
      // console.log(errorDelete);
      // if (window.confirm('Etes-vous sur de vouloir supprimer cette publication ?')) {
      //   fetchDelete(parseInt(postId.value, 10));
      //   // router.push('/publications');
      // }
    }
    return {
      fileName,
      getImageFile,
      userIdRegistered,
      isAdmin,
      publicationUpdated,
      updatePublication,
      statusPut,
      dataPut,
      errorPut,
      fetchPut,
      loadingPut,
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
.input_label {
  max-height: 40px;
}
</style>
