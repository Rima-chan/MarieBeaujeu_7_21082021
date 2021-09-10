<template>
    <div class="row">
        <div class="col-12">
            <span class="d-flex align-items-center my-3 mx-1 border-top border-bottom py-2">
                <i class="fas fa-comment m-0 ps-3 pe-2"></i>
                <h6 class="m-0">Commenter</h6>
            </span>
            <div class="col-12">All comments view</div>
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
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import CommentField from './formFields/CommentField.vue';
import useFetchPost from '../composables/useFetchPost';
import useAxiosHeaders from '../composables/useAxiosHeaders';

export default {
  components: { CommentField },
  name: 'Comments',
  setup(props) {
    const newComment = reactive({
      content: '',
      publicationId: '',
    });
    const { publi } = toRefs(props);
    console.log(publi);
    const userInLocalStorage = JSON.parse(localStorage.getItem('userRegistered'));
    const userImageUrl = userInLocalStorage ? userInLocalStorage.imageUrl : '../assets/avatar_user.png';
    const { authHeaders } = useAxiosHeaders();
    const {
      status, data, error, loading, fetch,
    } = useFetchPost(`publications/${newComment.publicationId}/comments`, newComment, authHeaders);
    const submitted = async () => {
      console.log(newComment);
    };
    return {
      userImageUrl,
      newComment,
      submitted,
      status,
      data,
      error,
      loading,
      fetch,
    };
  },
};
</script>

<style>

</style>
