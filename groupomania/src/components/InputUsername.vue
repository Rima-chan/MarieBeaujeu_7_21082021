<template>
    <div class="form-group d-flex flex-column my-3">
        <label for="inputUsername" class="align-self-start">Pseudo :</label>
        <input type="text" v-model="input" class="form-control" id="inputUsername" aria-describedby="Aide pseudo" placeholder="Marie B" minlength="4" maxlength="12">
    </div>
</template>

<script>
import useInputValidator from '../features/useInputValidator';

export default {
  name: 'InputUsername',
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    const { input } = useInputValidator(
      props.modelValue,
      (value) => emit('update:modelValue', value),
    );
    console.log('pseudo');
    console.log(input);
    return {
      input,
    };
  },
};
</script>

<style lang="">

</style>
