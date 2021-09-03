<template>
    <div class="row justify-content-center my-4">
        <form @submit.prevent action="">
            <email-field v-model="user.email" />
            <password-field v-model="user.password" />
            <username-field v-model="user.username" />
            <service-field v-model="user.service" />
            <admin-field v-model="user.isAdmin" />
            <button type="submit" :disabled="isSignupButtonDisabled" @click="signupButtonPressed" class="btn btn-dark">Inscription</button>
            <br><br>
            {{ errors }}
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
      isAdmin: '',
    });
    const { errors } = useFormValidation();
    const { isSignupButtonDisabled } = useSubmitButtonState(errors);
    console.log(isSignupButtonDisabled);
    const signupButtonPressed = () => {
      console.log('error form validation : ');
      console.log(errors);
      console.log(user);
    };
    return {
      user,
      errors,
      isSignupButtonDisabled,
      signupButtonPressed,
    };
  },
};
</script>

<style scoped>

</style>
