<template>
    <div class="form-group d-flex flex-column my-3">
        <label for="inputUsername" class="align-self-start">Pseudo :</label>
        <input type="text" v-model="input" @input="$emit('update:modelValue', $event.target.value)" @keyup="validateInput" class="form-control" id="inputUsername" aria-describedby="Aide pseudo" placeholder="Marie B" minlength="4" maxlength="12">
        <div v-if="errorMessage" class="invalidField d-inline-flex my-2">{{ errorMessage }}</div>
    </div>
</template>

<script>
import { ref } from 'vue';
import useFormValidation from '../../features/useFormValidation';

export default {
  name: 'UsernameField',
  setup() {
    const input = ref('');
    const errorMessage = ref('');
    const { validateUsernameField, errors } = useFormValidation();
    const validateInput = () => {
      validateUsernameField('username', input.value);
      errorMessage.value = errors ? errors.username : '';
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
