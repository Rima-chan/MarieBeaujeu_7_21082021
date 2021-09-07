import { toRefs } from '@vue/reactivity';
import { reactive } from 'vue';
import useFetchPost from './useFetch';

export default function useSubmitActionPost(ApiName, dataToSend) {
  const result = reactive({
    response: '',
    status: null,
    data: '',
    error: false,
    loading: false,
  });
  const submittedPost = async () => {
    const {
      response,
      status,
      data,
      error,
      loading,
    } = useFetchPost(ApiName, dataToSend);
    console.log('useSubmitAction : ');
    result.response = response;
    result.status = status;
    result.data = data;
    result.error = error;
    result.loading = loading;
    // console.log(response);
    // console.log(result.data);
    console.log(result.error);
  };
  return {
    ...toRefs(result),
    submittedPost,
  };
}
