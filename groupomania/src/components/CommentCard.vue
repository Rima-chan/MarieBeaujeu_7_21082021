<template>
    <div class="col-12 d-infline-flex flex-column">
        <div
          v-for="comment in data.comments"
          :comment="comment"
          :key="comment.id"
          class="">
          <div class="d-flex align-items-center my-1">
              <div class="col-2">
                  <img :src="comment.User.imageUrl" width="20" height="20" class="img-fluid shadow-sm rounded-circle" alt="Logo du profil">
              </div>
              <div class="col rounded-pill text-start text-wrap bg-light ps-3 py-1">
                <p class="fw-bold m-0">{{ comment.User.username }}</p>
                <p class="m-0 pe-3">{{comment.content}}</p>
            </div>
            <div class="col flex-grow-1">
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/runtime-core';
import useFetchGet from '../composables/useFetchGet';
import useAxiosHeaders from '../composables/useAxiosHeaders';

export default {
  name: 'CommentCard',
  props: {
    postId: Number,
  },
  setup(props) {
    const result = reactive({
      publicationId: '',
      comments: [],
      totalPages: 0,
    });
    const { postId } = toRefs(props);
    result.publicationId = postId.value;
    const { authHeaders } = useAxiosHeaders();
    const {
      status, data, error, loading,
    } = useFetchGet(`publications/${result.publicationId}/comments`, authHeaders);
    return {
      result,
      status,
      data,
      error,
      loading,
    };
  },
};
</script>

<style>
</style>
