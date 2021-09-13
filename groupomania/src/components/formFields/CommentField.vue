<template>
  <div>
    <label :for="commentName" class="sr-only">Ecrivez un commentaire</label>
        <input
          type="text"
          :id="commentName"
          @input="$emit('update:modelValue', $event.target.value)"
          @keyup="validateInput"
          :value="modelValue"
          class="form-control align-middle"
          placeholder="Ecrivez un commentaire..."
          min-length="1">
  </div>
</template>

<script>
import { toRefs } from 'vue';

export default {
  name: 'CommentField',
  props: {
    modelValue: String,
    commentId: Number,
  },
  setup(props) {
    const { commentId: commentName } = toRefs(props);
    return {
      commentName,
    };
  },
};
</script>

<style scoped>
</style>
