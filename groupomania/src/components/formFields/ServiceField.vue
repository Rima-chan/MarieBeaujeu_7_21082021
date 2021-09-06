<template>
    <div class="form-group d-flex flex-column my-3">
    <label for="serviceField" class="align-self-start">Selectionnez un service :</label>
    <select v-model="input" @input="$emit('update:modelValue', $event.target.value)" class="form-select mb-3" id="serviceField" required>
        <option disabled value="">-- Selectionnez un service --</option>
        <option value="RH">Ressources Humaines</option>
        <option value="Web">Web</option>
        <option value="Commercial">Commercial</option>
        <option value="Marketing">Marketing</option>
        <option value="Finance">Finance</option>
    </select>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ServiceField',
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
