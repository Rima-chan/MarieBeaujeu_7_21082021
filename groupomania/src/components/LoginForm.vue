<template>
    <div class="row justify-content-center my-4">
        <form novalidate @submit.prevent="onSubmit" action="">
            <email-field :email="email" />
            <input-password v-model="password" />
            <submit-button>Connexion</submit-button>
        </form>
    </div>
</template>

<script>
import EmailField from './EmailField.vue';
import InputPassword from './InputPassword.vue';
import SubmitButton from './SubmitButton.vue';

export default {
  components: { EmailField, InputPassword, SubmitButton },
  name: 'LoginForm',
};
</script>

<style scoped>

</style>
