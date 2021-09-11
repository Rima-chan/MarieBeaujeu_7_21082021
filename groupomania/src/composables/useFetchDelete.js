import { reactive } from 'vue';
import { toRefs } from '@vue/reactivity';
import axios from 'axios';
import useApiGenerator from './useApiUrlGenerator';

export default function useFetchDelete(ApiName, config) {
  axios.defaults.withCredentials = true;
  const result = reactive({
    response: [],
    status: null,
    data: [],
    error: null,
    loading: true,
  });
  const { url } = useApiGenerator(ApiName);
  const fetch = async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`, config);
      result.response = response;
      result.data = response.data;
      console.log(response.data);
      result.status = response.status;
    } catch (e) {
      result.error = e.response.data.error;
      console.log(e.response);
      console.log(result.error);
      result.status = e.response.status;
    } finally {
      result.loading = false;
    }
  };
  return {
    fetch,
    ...toRefs(result),
  };
}
