<template>
    <div class="row justify-content-center my-4">
        <form @submit.prevent method="post" v-if="status != 200" enctype="application/x-www-form-urlencoded">
            <email-field v-model="user.email" />
            <password-field v-model="user.password" />
            <button type="submit" @click="submittedPost" :disabled="isLoginButtonDisabled" class="btn btn-dark">Connexion</button>
            <br><br>
        </form>
        <error-display :isError="status && status != 200" :status="status" :error="errorMessage" />
        <!-- <div>{{ store.userState.userInfos }}</div> -->
    </div>
</template>

<script>
import {
  inject,
  reactive,
  watch,
} from 'vue';
import { useRouter } from 'vue-router';
import { ref } from '@vue/runtime-core';
// import store from '../store';
import EmailField from './formFields/EmailField.vue';
import PasswordField from './formFields/PasswordField.vue';
import ErrorDisplay from './ErrorDisplay.vue';
import useFormValidation from '../composables/useFormValidation';
import useSubmitButtonState from '../composables/useSubmitButtonState';
import useFetchPost from '../composables/useFetchPost';

export default {
  name: 'LoginForm',
  components: {
    EmailField,
    PasswordField,
    ErrorDisplay,
  },
  setup() {
    const store = inject('store');
    console.log(store);
    const router = useRouter();
    const errorMessage = ref('');
    const user = reactive({
      email: '',
      password: '',
    });
    const { errors } = useFormValidation();
    const { isLoginButtonDisabled } = useSubmitButtonState(user);
    const {
      status, data, xsrfToken, error, loading, fetch,
    } = useFetchPost('users/login', user);
    const submittedPost = async () => {
      fetch();
      console.log(data);
    };
    const updateUserState = (newUser) => {
      console.log('Cool');
      store.methods.setUser(newUser);
    };
    watch([loading], () => {
      if (status.value === 200) {
        console.log('OK');
        console.log(data.value);
        updateUserState(data.value);
        router.push('/accueil');
      }
      errorMessage.value = error.value ? `${error.value}` : 'Oups ! Il semblerait qu\'il y ait un soucis... 😥';
    });
    return {
      store,
      updateUserState,
      user,
      errors,
      errorMessage,
      isLoginButtonDisabled,
      status,
      data,
      error,
      xsrfToken,
      loading,
      fetch,
      submittedPost,
    };
  },
};
</script>

<style scoped>

</style>
