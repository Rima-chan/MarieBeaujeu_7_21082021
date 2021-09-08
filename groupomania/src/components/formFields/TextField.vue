<template>
    <div class="form-group d-flex flex-column my-3">
        <label for="publication_title" class="hidden">Ecrivez un titre pour votre publication : </label>
        <textarea
          id="publication_title"
          rows="2"
          wrap="hard"
          max-length="255"
          placeholder="Partagez-nous quelque chose..."></textarea>
    </div>
</template>

<script>

export default {
  name: 'TextField',
  setup() {
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
