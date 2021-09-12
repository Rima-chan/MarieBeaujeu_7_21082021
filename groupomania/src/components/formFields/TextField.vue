<template>
    <div class="flex-grow-1 me-2">
        <label for="publication_title" class="hidden">Ecrivez un titre pour votre publication : </label>
        <textarea
          id="publication_title"
          rows="3"
          wrap="hard"
          required
          max-length="255"
          style="width:100%"
          placeholder="Partagez-nous quelque chose..."
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"></textarea>
    </div>
</template>

<script>

export default {
  name: 'TextField',
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
.hidden {
   height: 1px;
   left: 0;
   overflow: hidden;
   position: absolute;
   top: -10000px;
   width: 1px;
}
</style>
