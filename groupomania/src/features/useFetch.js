import { reactive } from 'vue';
import { toRefs } from '@vue/reactivity';
import axios from 'axios';
import useApiGenerator from './useApiUrlGenerator';

export default function useFetchPost(ApiName, dataToSend) {
  const state = reactive({
    response: [],
    status: null,
    data: {},
    error: null,
    loading: true,
  });
  const { url } = useApiGenerator(ApiName);
  const fetch = async () => {
    try {
      const result = await axios.post(url, dataToSend);
      state.response = result;
      state.data = result.data;
      state.status = result.status;
    } catch (e) {
      state.error = e.response.data.error;
      state.status = e.response.status;
    } finally {
      state.loading = false;
    }
  };
  fetch();
  return {
    ...toRefs(state),
    fetch,
  };
}
