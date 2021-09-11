import { reactive } from 'vue';
import { toRefs } from '@vue/reactivity';
import axios from 'axios';
import useApiGenerator from './useApiUrlGenerator';

const basicHeadersConfig = {
  headers: { 'Content-Type': 'application/json' },
};

// Define a reactive object to catch fetch result
export default function useFetchPost(ApiName, dataToSend, config = basicHeadersConfig) {
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
      const response = await axios.post(url, dataToSend, config);
      result.response = response;
      result.data = response.data;
      result.xsrfToken = response.data.xsrfToken;
      result.status = response.status;
      console.log(result.data);
    } catch (e) {
      result.error = e.response ? e.response.data.error : e;
      result.status = e.response.status;
      console.log(result.status);
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
