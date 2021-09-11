<template>
    <span>
        <label
          for="inputId"
          class="btn btn-outline-info border-none rounded-circle"
          aria-label="Choisir une image">
            <i class="fas fa-images"></i>
            <input
             type="file"
             id="inputId"
             style="display:none"
             accept="image/*"
             @change="onFilePicked">
        </label>
        <!-- <img :src="imagePreviewSrc" alt="" id="image" style="width:100%"> -->
    </span>
</template>

<script>
import { ref, toRefs } from '@vue/runtime-core';

// TODO : faut-il réduire le type de fihcier img acccepté (jpg, png, jpeg, gif)
export default {
  name: 'InputFileField',
  props: {
    inputFieldId: String, // ajouter required ?
  },
  setup(props, context) {
    const { inputFieldId } = toRefs(props);
    const inputId = ref(inputFieldId.value);
    function onFilePicked(event) {
      // TODO : ajouter des règles de vérifications (Si file alors.., longueur, poids...)
      const file = event.target.files[0];
      if (file) {
        context.emit('getImageFile', file);
      }
    }
    return {
      onFilePicked,
      inputId,
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
