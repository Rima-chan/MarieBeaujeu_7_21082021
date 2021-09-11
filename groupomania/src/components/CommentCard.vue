<template>
    <div class="col-12 d-flex flex-column">
        <div
          v-for="comment in dataGet.comments"
          :comment="comment"
          :key="comment.id"
          class="">
          <div class="d-flex align-items-center mb-2">
              <div class="col-1 ms-3">
                  <img :src="comment.User.imageUrl" width="30" height="30" class="img-fluid shadow-sm rounded-circle" alt="Logo du profil">
              </div>
              <div class="col-10 rounded text-start text-wrap bg-light ps-3 py-1">
                <div class="d-flex justify-content-between">
                  <p class="text-wrap fw-bold m-0">{{ comment.User.username }}</p>
                  <button
                    v-if="userIdRegistered === comment.UserId || isAdmin"
                    :commentId="comment.id"
                    @click="deleteComment"
                    type="button"
                    class="btn-close me-2"
                    aria-label="Close"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Supprimer le commentaire"></button>
                </div>
                <p class="text-wrap text-break m-0 pe-3">{{comment.content}}</p>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import {
  reactive, ref, toRefs, watch,
} from '@vue/runtime-core';
// import { useRouter } from 'vue-router';
import useFetchGet from '../composables/useFetchGet';
import useFetchDelete from '../composables/useFetchDelete';
import useAxiosHeaders from '../composables/useAxiosHeaders';
import useUserInfos from '../composables/useUserInfos';

export default {
  name: 'CommentCard',
  props: {
    postId: Number,
  },
  setup(props) {
    // Handle navigation
    // const router = useRouter();
    // Authentificated user infos
    const {
      userId: userIdRegistered, isAdmin,
    } = useUserInfos();
    // Create reactive object to store fetch response
    const result = reactive({
      publicationId: '',
      comments: [],
      totalPages: 0,
    });
    // Recover props from parent component and declare empty reactive value for futur comment id
    const { postId } = toRefs(props);
    result.publicationId = postId.value;
    const commentId = ref('');
    // Requests headers
    const { authHeaders } = useAxiosHeaders();
    // GET all comments
    const {
      status: statusGet, data: dataGet, error: errorGet, loading: loadingGet,
    } = useFetchGet(`publications/${result.publicationId}/comments`, authHeaders);
    // DELETE comment
    const {
      status: statusDelete, error: errorDelete, loading: loadingDelete, fetch: fetchDelete,
    } = useFetchDelete(`publications/${result.publicationId}/comments/${commentId.value}`, authHeaders);
    function deleteComment(e) {
      commentId.value = parseInt(e.target.getAttribute('commentId'), 10);
      console.log(commentId.value);
      // fetchDelete();
      // if (window.confirm('Etes-vous sur de vouloir supprimer ce commentaire ?')) {
      //   // router.go(0);
      // }
    }
    watch(() => commentId.value, () => {
      fetchDelete();
    });
    return {
      userIdRegistered,
      isAdmin,
      result,
      statusGet,
      dataGet,
      errorGet,
      loadingGet,
      deleteComment,
      statusDelete,
      errorDelete,
      loadingDelete,
      fetchDelete,
    };
  },
};
</script>

<style>
</style>
