<template>
  <div>
    <label for="inputComment"></label>
        <input
          type="text"
          @input="$emit('update:modelValue', $event.target.value)"
          @keyup="validateInput"
          :value="modelValue"
          class="form-control align-middle" id="inputComment"
          aria-describedby=""
          placeholder="Ecrivez un commentaire..."
          min-length="1">
  </div>
</template>

<script>
import { ref } from '@vue/runtime-core';

export default {
  name: 'CommentField',
  props: {
    modelValue: String,
  },
  setup(props) {
    const input = ref('');
    return {
      props,
      input,
    };
  },
};
</script>

<style scoped>
</style>
