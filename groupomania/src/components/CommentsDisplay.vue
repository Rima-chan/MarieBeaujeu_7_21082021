<template>
    <div class="row">
        <div class="col-12">
            <span class="d-flex align-items-center my-3 mx-1 border-top border-bottom py-2">
                <i class="fas fa-comment m-0 ps-3 pe-2"></i>
                <h6 class="m-0">Commentaires</h6>
            </span>
            <comment-card :postId="newComment.publicationId"/>
            <form @submit.prevent method="post" enctype="application/x-www-form-urlencoded">
                <div class="d-flex align-items-center">
                <span class="col-2 p-0">
                    <img :src="userImageUrl" width="20" height="20" class="img-fluid rounded-circle" alt="Logo du profil">
                </span>
                <span class="col-8 mb-4 p-0">
                <comment-field v-model="newComment.content" />
                </span>
                <span class="col-2 p-0">
                <button
                  type="submit"
                  @click="submitted"
                  class="btn btn-info rounded-circle">
                    <i class="fas fa-paper-plane"></i>
                </button>
                </span>
                </div>
            </form>
            <span v-if="errorMessage" class="invalidField">{{ erroMessage }}</span>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
// import { useRouter } from 'vue-router';
import { ref, watch } from '@vue/runtime-core';
import CommentField from './formFields/CommentField.vue';
import useFetchPost from '../composables/useFetchPost';
import useAxiosHeaders from '../composables/useAxiosHeaders';
import CommentCard from './CommentCard.vue';

export default {
  components: { CommentField, CommentCard },
  name: 'CommentsDisplay',
  props: {
    postId: Number,
  },
  setup(props) {
    // const router = useRouter();
    const errorMessage = ref('');
    const newComment = reactive({
      content: '',
      publicationId: '',
    });
    const { postId } = toRefs(props);
    newComment.publicationId = postId.value;
    const userInLocalStorage = JSON.parse(localStorage.getItem('userRegistered'));
    const userImageUrl = userInLocalStorage ? userInLocalStorage.imageUrl : '../assets/avatar_user.png';
    const { authHeaders } = useAxiosHeaders();
    const {
      status, data, error, loading, fetch,
    } = useFetchPost(`publications/${newComment.publicationId}/comments`, newComment, authHeaders);
    const submitted = async () => {
      if (!newComment.publicationId || !newComment.publicationId) {
        errorMessage.value = 'Impossible de publier le commentaire';
      } else {
        fetch();
      }
      console.log(newComment);
      console.log(data);
      newComment.content = '';
    };
    watch(() => status.value, (value) => {
      if (value === 201) {
        console.log('Comment crée');
      } else {
        errorMessage.value = 'Désolé nous n\'avons pas pu poster votre message 😥';
      }
    });
    return {
      userImageUrl,
      newComment,
      submitted,
      status,
      data,
      error,
      loading,
      fetch,
      errorMessage,
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
