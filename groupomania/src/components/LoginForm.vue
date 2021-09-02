<template>
    <div class="row justify-content-center my-4">
        <form action="">
            <input-email v-model="email" />
            <input-password v-model="password" />
            <submit-button>Connexion</submit-button>
        </form>
    </div>
</template>

<script>
import InputEmail from './InputEmail.vue';
import InputPassword from './InputPassword.vue';
import SubmitButton from './SubmitButton.vue';

export default {
  components: { InputEmail, InputPassword, SubmitButton },
  name: 'LoginForm',
};
</script>

<style scoped>

</style>
