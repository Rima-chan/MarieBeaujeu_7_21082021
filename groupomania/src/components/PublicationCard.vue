<template>
  <div>
    <div
      class="card my-4 publication_card"
      v-for="publication in data.publications"
      :publication="publication"
      :key="publication.id" >
      <div class="card-body text-start">
        <div class="card-title d-flex align-items-center">
            <div class="flex-shrink-0">
              <img :src="publication.User.imageUrl" width="40" height="40" class="img-fluid rounded-circle shadow-sm flex-grow-2" alt="Image profil publication">
            </div>
            <span class="flex-grow-1 ms-3">
              <p class="h6">{{ publication.User.username }}</p>
              <small class="text-muted">Le {{ publication.createdAt.substr(0, 10).split("-").reverse().join("-") }}</small>
            </span>
            <update-publication-button :postId="publication.id" v-if="isAdmin || publication.UserId === userIdRegistered" :content="publication.title" />
          </div>
          <p class="card-text">{{ publication.title }}</p>
      </div>
      <img
        :src="publication.attachment"
        alt="image publication"
        class="display-block card-img-bottom img-fluid publication_image"
      />
      <comments-display :postId="publication.id" />
    </div>
  </div>
</template>

<script>
// import { reactive } from '@vue/runtime-core';
// import { onMounted } from 'vue';
import { ref } from 'vue';
import CommentsDisplay from './CommentsDisplay.vue';
import UpdatePublicationButton from './UpdatePublicationCard.vue';
import useFetchGet from '../composables/useFetchGet';
import useAxiosHeaders from '../composables/useAxiosHeaders';
import useUserInfos from '../composables/useUserInfos';

export default {
  components: { CommentsDisplay, UpdatePublicationButton },
  name: 'PublicationCard',
  setup() {
    // Authentificated user infos
    const {
      userId: userIdRegistered, isAdmin,
    } = useUserInfos();
    // GET all publications
    const { authHeaders } = useAxiosHeaders();
    const {
      status, data, error, loading,
    } = useFetchGet('publications', authHeaders);
    //   errorMessage = 'Aucunes publications recentes... 😴';
    const publicationId = ref('');
    return {
      userIdRegistered,
      isAdmin,
      status,
      data,
      error,
      loading,
      publicationId,
    };
  },
};
</script>

<style scoped>
.dropdown-toggle::after {
  display: none;
}
</style>
