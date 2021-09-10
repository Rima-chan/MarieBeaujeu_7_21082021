<template>
  <div>
    <label for="inputComment"></label>
        <input
          type="text"
          @input="$emit('update:modelValue', $event.target.value)"
          :value="modelValue"
          class="form-control align-middle" id="inputComment"
          aria-describedby=""
          placeholder="Ecrivez un commentaire..."
          min-length="1">
  </div>
</template>

<script>

export default {
  name: 'CommentField',
  props: {
    modelValue: String,
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style scoped>
</style>
