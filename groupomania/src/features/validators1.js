import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      email: '',
      password: '',
      username: '',
    });
    const rules = {
      email: { required },
      password: { required },
      username: { required },
    };
    const v$ = useVuelidate(rules, state);

    return {
      state,
      v$,
    };
  },
};
