<template>
    <div class="row justify-content-center my-4">
        <form novalidate @submit.prevent="onSubmit" action="">
            <email-field v-model="email" />
            <password-field />
        </form>
    </div>
</template>

<script>
import EmailField from './formFields/EmailField.vue';
import PasswordField from './formFields/PasswordField.vue';

export default {
  name: 'LoginForm',
  components: {
    EmailField,
    PasswordField,
  },
};
</script>

<style scoped>

</style>
