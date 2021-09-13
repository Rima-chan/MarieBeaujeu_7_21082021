<template>
    <div class="form-group d-flex flex-column my-3">
        <label for="inputEmail" class="align-self-start mb-2">Email :</label>
        <input
          type="email"
          v-model="input"
          @input="$emit('update:modelValue', $event.target.value)"
          @keyup="validateInput"
          class="form-control"
          id="inputEmail"
          placeholder="Exemple@exemple.com"
          required>
        <div v-if="errorMessage" class="invalidField d-inline-flex my-2">{{ errorMessage }}</div>
    </div>
</template>

<script>
import { ref } from 'vue';
import useFormValidation from '../../composables/useFormValidation';

export default {
  name: 'EmailField',
  setup() {
    // Using ref() to make properties reactive
    const input = ref('');
    const errorMessage = ref('');
    // Call useFormValidation function and to get back validateEmailField function and errors reactive object
    const { validateEmailField, errors } = useFormValidation();
    // Function called once input is changed - Use validateEmailField function called above
    const validateInput = () => {
      validateEmailField('email', input.value);
      errorMessage.value = errors ? errors.email : '';
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
