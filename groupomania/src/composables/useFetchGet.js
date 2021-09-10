import { reactive, watch } from 'vue';
import { toRefs } from '@vue/reactivity';
import axios from 'axios';
import useApiGenerator from './useApiUrlGenerator';

export default function useFetchGet(ApiName, config) {
  axios.defaults.withCredentials = true;
  const result = reactive({
    response: [],
    status: null,
    data: {},
    error: null,
    loading: true,
  });
  const { url } = useApiGenerator(ApiName);
  watch(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(url, config);
        result.response = response;
        result.data = response.data;
        result.status = response.status;
      } catch (e) {
        result.error = e.response.data.error;
        console.log(result.error);
        result.status = e.response.status;
      } finally {
        result.loading = false;
      }
    };
    fetch();
  });
  return {
    ...toRefs(result),
  };
}
