<template>
  <div>
    <div
      class="card align-self-center my-4"
      v-for="publication in data.publications"
      :publication="publication"
      :key="publication.id"
    >
      <div class="card-body">
        <span></span>
        <div class="card-title">{{ publication.title }}</div>
        <p class="card-text">
          <small class="text-muted">Last updated 3 mins ago</small>
        </p>
      </div>
      <img
        :src="publication.attachment"
        alt="Hey"
        class="display-block card-img-bottom"
        width="200"
        height="300"
      />
    </div>
  </div>
</template>
0
<script>
import { reactive } from '@vue/runtime-core';
import useFetchGet from '../composables/useFetchGet';
import useAxiosHeaders from '../composables/useAxiosHeaders';

export default {
  name: 'PublicationCard',
  setup() {
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
    console.log(data.publications);
    console.log(error);
    if (data) {
      result.publications = data;
    //   const test = toRef(data.value);
    //   console.log(test);
    }
    // watch(() => status, (statusValue) => {
    //   if (statusValue === 200) {
    //     result.publications = data.publications;
    //     result.totalPages = data.totalPages;
    //     console.log(result.publications);
    //   }
    // });
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
