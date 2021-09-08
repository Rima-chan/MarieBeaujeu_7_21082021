<template>
    <span>
        <label for="publication_file" class="btn btn-outline-info" aria-label="Choisir une image">
          <i class="fas fa-images"></i>
          <input
          type="file"
          id="publication_file"
          style="display:none"
          accept=".png,.jpeg,.jpg,.gif">
        </label>
    </span>
</template>

<script>

export default {
  name: 'InputFileField',
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
