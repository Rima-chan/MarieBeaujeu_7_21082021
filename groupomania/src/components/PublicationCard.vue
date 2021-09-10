<template>
  <div>
    <div
      class="card align-self-center my-4"
      v-for="publication in data.publications"
      :publication="publication"
      :key="publication.id" >
      <div class="card-body text-start">
        <div class="card-title d-flex align-items-center">
          <div class="flex-shrink-0">
            <img :src="publication.User.imageUrl" width="40" height="40" class="img-fluid rounded-circle flex-grow-2" alt="Logo du profil">
          </div>
          <span class="flex-grow-1 ms-3">
            <h6 class="">{{ publication.User.username }}</h6>
            <small class="text-muted">{{ publication.createdAt.substr(0, 10).split("-").reverse().join("-") }}</small>
          </span>
          </div>
          <p class="card-text">{{ publication.title }}</p>
      </div>
      <img
        :src="publication.attachment"
        alt="Hey"
        class="display-block card-img-bottom img-fluid publication_image"
      />
      <comments :publicationId="publication.id" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/runtime-core';
import useFetchGet from '../composables/useFetchGet';
import useAxiosHeaders from '../composables/useAxiosHeaders';
import Comments from './CommentsCard.vue';

export default {
  components: { Comments },
  name: 'PublicationCard',
  setup() {
    let errorMessage;
    const result = reactive({
      publications: [],
      totalPages: 0,
    });
    // const userToken = ref('');
    // const userRegistered = JSON.parse(localStorage.getItem('userRegistered'));
    // userToken.value = userRegistered.token;
    const { authHeaders } = useAxiosHeaders();
    const {
      status, data, error, loading,
    } = useFetchGet('publications', authHeaders);
    //   errorMessage = 'Aucunes publications recentes... 😴';
    //   errorMessage = 'La page demandée n\'existe pas 🤷‍♀️';
    return {
      result,
      status,
      data,
      error,
      loading,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.publication_image {
  max-width: 400px;
  max-height: 300px;
}
</style>
