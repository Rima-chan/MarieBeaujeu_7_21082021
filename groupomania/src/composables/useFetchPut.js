import { reactive, toRefs } from 'vue';
import axios from 'axios';
import useApiGenerator from './useApiUrlGenerator';

export default function useFetchPut(ApiName, dataToSend, config) {
  axios.defaults.withCredentials = true;
  const result = reactive({
    response: [],
    status: null,
    data: {},
    error: null,
    loading: true,
    xsrfToken: '',
  });
  // Use a composable function to define api url
  const { url } = useApiGenerator(ApiName);
  // Stock fetch result data in the reactive object created above
  const fetch = async () => {
    try {
      const response = await axios.put(url, dataToSend, config);
      result.response = response;
      result.data = response.data;
      result.xsrfToken = response.data.xsrfToken;
      result.status = response.status;
    } catch (e) {
      result.error = e.response.data.error ? e.response.data.error : e;
      result.status = e.response.status;
    } finally {
      result.loading = false;
    }
  };
  // Return fetch function which will be call later
  return {
    ...toRefs(result),
    fetch,
  };
}
