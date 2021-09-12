<template>
    <div class="row justify-content-center my-4">
        <form @submit.prevent method="post" v-if="status != 201" enctype="application/x-www-form-urlencoded">
            <email-field v-model="user.email" />
            <password-field v-model="user.password" />
            <username-field v-model="user.username" />
            <service-field v-model="user.service" />
            <button type="submit" @click="submittedPost" :disabled="isSignupButtonDisabled" class="btn btn-dark mt-3">Inscription</button>
            <br><br>
        </form>
        <success-display :isSuccess="status === 201" :message="validationMessage"/>
        <error-display :isError="status && status != 201" :status="status" :error="error || errorMessage" />
    </div>
</template>

<script>
// import { ref } from 'vue';
import { reactive, watch } from 'vue';
// import { useRouter } from 'vue-router';
// import { useRouter, onBeforeRouteLeave } from 'vue-router';
import EmailField from './formFields/EmailField.vue';
import PasswordField from './formFields/PasswordField.vue';
import UsernameField from './formFields/UsernameField.vue';
import ServiceField from './formFields/ServiceField.vue';
import useFormValidation from '../composables/useFormValidation';
import useSubmitButtonState from '../composables/useSubmitButtonState';
import useFetchPost from '../composables/useFetchPost';
import ErrorDisplay from './ErrorDisplay.vue';
import SuccessDisplay from './SuccessDisplay.vue';

// TODO :
// onBeforeRouteLeave (msg confirmation) : trouver un moyen de mettre un minuteur sinon redirection directe et msg pas vu
// useRouter - router.psuh pour rediriger vers une autre page
// Ameliorer la gestion du message d'erreur : peut-être faire comme le status avec Watch
export default {
  name: 'SignupForm',
  components: {
    EmailField,
    PasswordField,
    UsernameField,
    ServiceField,
    ErrorDisplay,
    SuccessDisplay,
  },
  setup() {
    // Make a reactive copy of the User object (which recieve user input)
    const user = reactive({
      email: '',
      password: '',
      username: '',
      service: '',
    });
    // Get back errors from form fields validation function
    const { errors } = useFormValidation(); // form field validation ?
    // Return disabled button boolean according to a user object (fields not empty) and errors (empty)
    const { isSignupButtonDisabled } = useSubmitButtonState(user, errors);
    // Returns reactives constants from fetch composable (these constants will stock futur fetch result and be used by template)
    // Also returns fetch function
    const {
      status, data, error, loading, fetch,
    } = useFetchPost('users/signup', user);
    // Function called when button is submitted, call fetch function
    const submittedPost = async () => {
      fetch();
    };
    // Check changes on fetch status and save pseudo to localStorage if status = 201
    // Use value because status is a reactive object and not a ref
    // TODO : utiliser le watch status comme le 201 pour déf message d'erreur ?
    watch(() => status.value, (value) => {
      if (value === 201) {
        localStorage.setItem('pseudo', user.username);
      }
    });
    const validationMessage = 'Votre compte a bien été crée !';
    const errorMessage = status === 409 ? `${error.value}` : 'Oups... Il semblerait qu\'il y ait un problème de notre coté... Vous pouvez signaler les bugs en bas de page ';
    return {
      user,
      errors,
      isSignupButtonDisabled,
      submittedPost,
      status,
      data,
      error,
      errorMessage,
      loading,
      validationMessage,
    };
  },
};
</script>

<style scoped>

</style>
