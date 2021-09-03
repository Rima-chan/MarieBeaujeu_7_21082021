<template>
    <div class="form-group d-flex flex-column my-3">
        <label for="inputPassword" class="align-self-start">Mot de passe :</label>
        <input type="text" v-model="input" class="form-control" id="inputPassword" aria-describedby="Mot de passe" minlength="8">
    </div>
</template>

<script>
import useInputValidator from '../features/useInputValidator';

export default {
  name: 'InputPassword',
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    const { input } = useInputValidator(
      props.modelValue,
      (value) => emit('update:modelValue', value),
    );
    return {
      input,
    };
  },
};
</script>

<style>

</style>
