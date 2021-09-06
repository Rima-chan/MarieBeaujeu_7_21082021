import { ref } from 'vue';
import axios from 'axios';
import useApiGenerator from './useApiUrlGenerator';

export default function useFetchPost(ApiName, dataToSend) {
  const data = ref(null);
  const response = ref(null);
  const error = ref(null);
  const loading = ref(false);
  const { url } = useApiGenerator(ApiName);
  const fetch = async () => {
    loading.value = true;
    try {
      const result = await axios.post(url, dataToSend);
      response.value = result;
      data.value = result.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };
  fetch();
  return {
    response,
    error,
    data,
    loading,
    fetch,
  };
}
