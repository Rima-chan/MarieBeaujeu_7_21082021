<template>
    <div class="row justify-content-center my-4">
        <form novalidate @submit.prevent="onSubmit" action="">
            <input-email v-model="email" />
            <input-password v-model="password" />
            <input-username v-model="username" />
            <select class="form-select my-3">
                <option selected>Choisir un service</option>
                <option value="RH">Ressources Humaines</option>
                <option value="Web">Web</option>
                <option value="Commercial">Commercial</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
            </select>
            <div class="form-check d-flex justify-content-start mt-3 mb-5">
                <input type="checkbox" class="form-check-input" id="isAdminCheckBox">
                <labek class="form-check-label ps-3" for="isAdminCheckBox">Administrateur</labek>
            </div>
            <submit-button>Inscription</submit-button>
        </form>
    </div>
</template>

<script>
import InputEmail from './InputEmail.vue';
import InputPassword from './InputPassword.vue';
import InputUsername from './InputUsername.vue';
import SubmitButton from './SubmitButton.vue';

export default {
  name: 'SignupForm',
  components: {
    InputEmail,
    InputPassword,
    InputUsername,
    SubmitButton,
  },
};
</script>

<style scoped>

</style>
