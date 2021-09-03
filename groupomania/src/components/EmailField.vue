<template>
    <div class="form-group d-flex flex-column my-3">
        <label for="inputEmail" class="align-self-start mb-2">Email :</label>
        <input type="text" v-model="input" @keyup="validateInput" class="form-control" id="inputEmail" aria-describedby="Aide email" placeholder="Exemple@exemple.com">
        <div v-if="errors" class="invalidField d-inline-flex my-2">{{ errors }}</div>
    </div>
</template>

<script>
import { ref } from 'vue';
import useFormValidation from '../features/useFormValidation';

export default {
  name: 'EmailField',
  setup() {
    const input = ref('');
    const { validateNameField, errors } = useFormValidation();
    const validateInput = () => {
      console.log(validateNameField);
      console.log(errors);
    };
    // const validateInput = () => (error.value === input.value === '' ? 'Ce champs est requis' : '');
    // const validateInput = () => {
    //   error.value = input.value === '' ? 'Ce champs est requis' : '';
    // };
    return {
      input,
      errors,
      validateInput,
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
