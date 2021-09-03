<template>
    <div class="row justify-content-center my-4">
        <form novalidate @submit.prevent="onSubmit" action="">
            <email-field v-model="email" />
            <password-field />
            <submit-button>Connexion</submit-button>
        </form>
    </div>
</template>

<script>
import EmailField from './formFields/EmailField.vue';
import PasswordField from './formFields/PasswordField.vue';
import SubmitButton from './SubmitButton.vue';

export default {
  name: 'LoginForm',
  components: {
    EmailField,
    PasswordField,
    SubmitButton,
  },
};
</script>

<style scoped>

</style>
