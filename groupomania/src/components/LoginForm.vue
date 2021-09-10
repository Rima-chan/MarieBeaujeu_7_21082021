<template>
    <div class="row justify-content-center my-4">
        <form @submit.prevent method="post" v-if="status != 200" enctype="application/x-www-form-urlencoded">
            <email-field v-model="user.email" />
            <password-field v-model="user.password" />
            <button type="submit" @click="submittedPost" :disabled="isLoginButtonDisabled" class="btn btn-dark">Connexion</button>
            <br><br>
        </form>
        <error-display :isError="status && status != 200" :status="status" :error="errorMessage" />
    </div>
</template>

<script>
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ref } from '@vue/runtime-core';
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
    };
    watch(() => status.value, (value) => {
      if (value === 200) {
        localStorage.setItem('userRegistered', JSON.stringify(data.value));
        localStorage.setItem('xsrfToken', JSON.stringify(xsrfToken.value));
        router.push('/accueil');
      }
      errorMessage.value = error.value ? `${error.value}` : 'Oups ! Il semblerait qu\'il y ait un soucis... 😥';
    });
    return {
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
