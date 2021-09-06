<template>
    <div class="form-group d-flex flex-column my-3">
        <label for="inputPassword" class="align-self-start">Mot de passe :</label>
        <input type="password" v-model="input" @input="$emit('update:modelValue', $event.target.value)" @keyup="validateInput" class="form-control" id="inputPassword" min-length="8" required aria-describedby="Mot de passe">
        <div v-if="errorMessage" class="invalidField d-inline-flex my-2">{{ errorMessage }}</div>
    </div>
</template>

<script>
import { ref } from 'vue';
import useFormValidation from '../../features/useFormValidation';

export default {
  name: 'PasswordField',
  setup() {
    const input = ref('');
    const errorMessage = ref('');
    const { validatePasswordField, errors } = useFormValidation();
    const validateInput = () => {
      validatePasswordField('password', input.value);
      errorMessage.value = errors ? errors.password : '';
    };
    return {
      input,
      errorMessage,
      validateInput,
      errors,
    };
  },
};
</script>

<style scoped>
.invalidField {
  color: red;
  font-size: .8rem;
}
</style>
