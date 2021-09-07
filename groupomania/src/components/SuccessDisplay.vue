<template>
    <div v-if="success" class="alert alert-success" role="alert">{{ message }}</div>
</template>

<script>
export default {
  name: 'SucessDisplay',
  props: {
    success: Boolean,
    message: String,
  },
};
</script>

<style scoped>

</style>
