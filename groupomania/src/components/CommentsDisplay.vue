<template>
    <div class="row">
        <div class="col-12">
            <span class="d-flex align-items-center my-3 mx-1 border-top border-bottom py-2">
                <i class="fas fa-comment m-0 ps-3 pe-2"></i>
                <h6 class="m-0">Commentaires</h6>
            </span>
        </div>
        <comment-card :postId="newComment.publicationId" :commentId="newComment.id" />
        <div class="col-12">
          <form @submit.prevent method="post" enctype="application/x-www-form-urlencoded">
                <div class="d-flex align-items-center">
                <span class="col-2 p-0">
                    <img :src="imageProfil" width="20" height="20" class="img-fluid rounded-circle" alt="Logo du profil">
                </span>
                <span class="col-8 mb-4 p-0">
                <comment-field v-model="newComment.content" />
                </span>
                <span class="col-2 p-0">
                <button
                  type="submit"
                  @click="submitted"
                  :disabled="newComment.content.length === 0"
                  class="btn btn-info rounded-circle">
                  <i class="fas fa-paper-plane"></i>
                </button>
                </span>
                </div>
            </form>
        </div>
        <span class="invalidField">{{ errorMessage }}</span>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { ref, watch } from '@vue/runtime-core';
import CommentField from './formFields/CommentField.vue';
import CommentCard from './CommentCard.vue';
import useFetchPost from '../composables/useFetchPost';
import useAxiosHeaders from '../composables/useAxiosHeaders';
import useUserInfos from '../composables/useUserInfos';

export default {
  components: { CommentField, CommentCard },
  name: 'CommentsDisplay',
  props: {
    postId: Number,
  },
  setup(props) {
    // Handle Navigation
    const router = useRouter();
    const errorMessage = ref('');
    const isErrorDisplay = ref(false);
    // Recover props and creat reactive object for the new comment
    const { postId } = toRefs(props);
    const newComment = reactive({
      content: '',
      publicationId: '',
    });
    newComment.publicationId = postId.value;
    // Authentificated user infos
    const {
      userId: userIdRegistered, imageProfil,
    } = useUserInfos();
    // CREATE comment
    const { authHeaders } = useAxiosHeaders();
    const {
      status, data, error, loading, fetch,
    } = useFetchPost(`publications/${newComment.publicationId}/comments`, newComment, authHeaders);
    const submitted = async () => {
      if (!newComment.content || !newComment.publicationId) {
        errorMessage.value = 'Il manque des infos pour publier le commentaire';
      } else {
        fetch();
        newComment.content = '';
        console.log(data.value);
        router.go(0);
      }
      return errorMessage;
    };
    watch(() => status.value, (value) => {
      if (value === 201) {
        router.go(0);
      } else {
        alert('Désole il y a un problème 🤷');
      }
    });
    return {
      userIdRegistered,
      imageProfil,
      newComment,
      submitted,
      status,
      data,
      error,
      loading,
      fetch,
      errorMessage,
      isErrorDisplay,
    };
  },
};
</script>

<style scoped>
.invalidField {
  color: red;
  font-size: .8rem;
}
</style>
