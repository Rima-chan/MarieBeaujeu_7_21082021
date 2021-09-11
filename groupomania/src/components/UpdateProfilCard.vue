<template>
    <form @submit.prevent method="post" enctype="multipart/form-data">
        <username-field />
        <service-field />
        <input-file-field />
        <img :src="imagePreviewUrl" alt="" id="image" style="width:100%" class="img-fluid">
        <span class="d-inline-flex justify-content-end mt-3 mb-2">
          <button
            @click="deleteProfil"
            type="button"
            class="btn btn-outline-danger me-3" id="deleteProfilButton">
            <i class="fas fa-trash-alt"></i>
          </button>
          <button type="submit" @click="submitted" class="btn btn-outline-success float-end rounded-pill">Modifier</button>
        </span>
    </form>
</template>

<script>
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { ref, watch } from '@vue/runtime-core';
import ServiceField from './formFields/ServiceField.vue';
import UsernameField from './formFields/UsernameField.vue';
import useAxiosHeaders from '../composables/useAxiosHeaders';
import useFetchDelete from '../composables/useFetchDelete';

export default {
  components: { UsernameField, ServiceField },
  name: 'UpdateProfilCard',
  setup() {
    const route = useRoute();
    // const router = useRouter();
    const userId = ref(null);
    const validationMessage = ref('');
    userId.value = route.params.userId;
    const { authHeaders } = useAxiosHeaders();
    const {
      status: statusDelete, data: dataDelete, error: errorDelete, loading: loadingDelete, fetch: fetchDelete,
    } = useFetchDelete(`users/${userId.value}`, authHeaders);
    function deleteProfil() {
      console.log('Delete');
      // confirm('Etes vous sur de vouloir supprimer ce compte ?');
      fetchDelete();
    }
    watch(() => statusDelete.value, (value) => {
      if (value === 200) {
        onBeforeRouteLeave((to, from) => {
          localStorage.removeItem('xsrfToken');
          localStorage.removeItem('userRegistered');
          validationMessage.value = 'Compte supprimé !';
          console.log(to);
          console.log(from);
        });
      }
    });
    return {
      deleteProfil,
      statusDelete,
      dataDelete,
      errorDelete,
      loadingDelete,
      fetchDelete,
      validationMessage,
    };
  },
};
</script>

<style>
</style>
