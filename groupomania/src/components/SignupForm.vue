<template>
    <div class="row justify-content-center my-4">
        <form @submit.prevent method="post" enctype="application/x-www-form-urlencoded">
            <email-field v-model="user.email" />
            <password-field v-model="user.password" />
            <username-field v-model="user.username" />
            <service-field v-model="user.service" />
            <admin-field v-model="user.isAdmin" />
            <button type="submit" @click="signupButtonPressed" :disabled="isButtonDisabled" class="btn btn-dark">Inscription</button>
            <br><br>
        </form>
    </div>
</template>

<script>
// import { ref } from 'vue';
import { reactive } from 'vue';
import EmailField from './formFields/EmailField.vue';
import PasswordField from './formFields/PasswordField.vue';
// import SubmitButton from './SubmitButton.vue';
import UsernameField from './formFields/UsernameField.vue';
import ServiceField from './formFields/ServiceField.vue';
import AdminField from './formFields/AdminField.vue';
import useFormValidation from '../features/useFormValidation';
import useSubmitButtonState from '../features/useSubmitButtonState';
import useFetchPost from '../features/useFetch';

export default {
  name: 'SignupForm',
  components: {
    EmailField,
    PasswordField,
    UsernameField,
    ServiceField,
    AdminField,
  },
  setup() {
    const user = reactive({
      email: '',
      password: '',
      username: '',
      service: '',
      isAdmin: false,
    });
    const { errors } = useFormValidation(); // 1 cran de retard car c'est lerror du formvalidation et donc Mais C'est good dans les erreurs envoyées
    const { isButtonDisabled } = useSubmitButtonState(user, errors);
    const signupButtonPressed = () => {
      console.log(user);
      const {
        response, error, data, loading,
      } = useFetchPost('users', user);
      console.log(response);
      console.log(error);
      console.log(data);
      console.log(loading);
    };
    return {
      user,
      errors,
      isButtonDisabled,
      signupButtonPressed,
    };
  },
};
</script>

<style scoped>

</style>
