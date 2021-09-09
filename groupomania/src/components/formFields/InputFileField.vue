<template>
    <span>
        <label
          for="publication_file"
          class="btn btn-outline-info border-none rounded-circle"
          aria-label="Choisir une image">
            <i class="fas fa-images"></i>
            <input
             type="file"
             id="publication_file"
             style="display:none"
             accept="image/*"
             @change="onFilePicked">
        </label>
        <!-- <img :src="imagePreviewSrc" alt="" id="image" style="width:100%"> -->
    </span>
</template>

<script>

// TODO : faut-il réduire le type de fihcier img acccepté (jpg, png, jpeg, gif)
export default {
  name: 'InputFileField',
  setup(props, context) {
    function onFilePicked(event) {
      // TODO : ajouter des règles de vérifications (Si file alors.., longueur, poids...)
      const file = event.target.files[0];
      if (file) {
        context.emit('getImageFile', file);
      }
    }
    return {
      onFilePicked,
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
