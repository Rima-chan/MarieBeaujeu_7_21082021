<template>
    <div class="form-check d-flex justify-content-start mt-3 mb-5">
        <input type="checkbox" v-model="input" @input="$emit('update:modelValue', !input)" class="form-check-input" id="isAdminCheckBox">
        <label class="form-check-label ps-3" for="isAdminCheckBox">Administrateur</label>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'AdminField',
  setup() {
    const input = ref(null);
    return {
      input,
    };
  },
};
</script>

<style scoped>

</style>
