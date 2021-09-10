<template>
  <div>
    <label for="inputComment"></label>
        <input
          type="text"
          v-model="input"
          @input="$emit('update:modelValue', $event.target.value)"
          class="form-control align-middle" id="inputComment"
          aria-describedby=""
          placeholder="Ecrivez un commentaire..."
          required>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CommentField',
  setup() {
    const input = ref('');
    return {
      input,
    };
  },
};
</script>

<style scoped>
</style>
