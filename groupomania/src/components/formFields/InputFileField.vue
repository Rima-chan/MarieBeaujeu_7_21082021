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
import { ref } from 'vue';

export default {
  name: 'InputFileField',
  setup(props, context) {
    let imageUrl = ref('');
    const imagePreviewSrc = ref('');
    const filename = ref('');
    function onFilePicked(event) {
      // TODO : ajouter des règles de vérifications (Si file alors.., longueur, poids...)
      const file = event.target.files[0];
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviewSrc.value = e.target.result;
      };
      reader.readAsDataURL(file);
      filename.value = file.name;
      imageUrl = file;
      console.log(imageUrl);
      context.emit('imagePreviewUrl', imagePreviewSrc.value);
    }
    return {
      onFilePicked,
      imageUrl,
      imagePreviewSrc,
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
