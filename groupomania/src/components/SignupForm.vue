<template>
    <div class="row justify-content-center my-4">
        <form @submit.prevent method="post" v-if="status != 201" enctype="application/x-www-form-urlencoded">
            <email-field v-model="user.email" />
            <password-field v-model="user.password" />
            <username-field v-model="user.username" />
            <service-field v-model="user.service" />
            <admin-field v-model="user.isAdmin" />
            <button type="submit" @click="submittedPost" :disabled="isButtonDisabled" class="btn btn-dark">Inscription</button>
            <br><br>
        </form>
        <!-- <error-display v-if="fetchResponse.error" :error="fetchResponse.error" /> -->
        <success-display :success="status === 201" :message="validationMessage"/>
        <error-display :status="status" :isError="status && status != 201" :error="error || errorMessage" />
        <div>{{ status }}</div>
        <div>{{ error }}</div>
    </div>
</template>

<script>
// import { ref } from 'vue';
import { onMounted, reactive } from 'vue';
import EmailField from './formFields/EmailField.vue';
import PasswordField from './formFields/PasswordField.vue';
// import SubmitButton from './SubmitButton.vue';
import UsernameField from './formFields/UsernameField.vue';
import ServiceField from './formFields/ServiceField.vue';
import AdminField from './formFields/AdminField.vue';
import useFormValidation from '../features/useFormValidation';
import useSubmitButtonState from '../features/useSubmitButtonState';
// import useFetchPost from '../features/useFetch';
import useSubmitAction from '../features/useSubmitAction';
import ErrorDisplay from './ErrorDisplay.vue';
import SuccessDisplay from './SuccessDisplay.vue';
// import ErrorDisplay from './ErrorDisplay.vue';

export default {
  name: 'SignupForm',
  components: {
    EmailField,
    PasswordField,
    UsernameField,
    ServiceField,
    AdminField,
    ErrorDisplay,
    SuccessDisplay,
  },
  setup() {
    const user = reactive({
      email: '',
      password: '',
      username: '',
      service: '',
      isAdmin: false,
    });
    const { errors } = useFormValidation();
    const { isButtonDisabled } = useSubmitButtonState(user, errors);
    const {
      status, data, error, loading, submittedPost,
    } = useSubmitAction('users/signup', user);
    const validationMessage = 'Votre compte à bien été crée !';
    const errorMessage = status === 409 ? `${error.value}` : 'Oups... Il semblerait qu\'il y ait un problème de notre coté... Vous pouvez signaler les bugs en fin de page ';
    onMounted(() => console.log('Comp mounted'));
    return {
      user,
      errors,
      isButtonDisabled,
      submittedPost,
      status,
      data,
      error,
      errorMessage,
      // errorStatus,
      loading,
      validationMessage,
    };
  },
};
</script>

<style scoped>

</style>
