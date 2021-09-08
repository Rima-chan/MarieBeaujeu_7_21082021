import { reactive } from 'vue';
import { toRefs } from '@vue/reactivity';
import axios from 'axios';
import useApiGenerator from './useApiUrlGenerator';

// Define a reactive object to catch fetch result
export default function useFetchPost(ApiName, dataToSend) {
  const result = reactive({
    response: [],
    status: null,
    data: {},
    error: null,
    loading: true,
  });
  // Use a composable function to define api url
  const { url } = useApiGenerator(ApiName);
  // Stock fetch result data in the reactive object created above
  const fetch = async () => {
    try {
      const response = await axios.post(url, dataToSend);
      result.response = response;
      result.data = response.data;
      result.status = response.status;
    } catch (e) {
      result.error = e.response.data.error;
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
