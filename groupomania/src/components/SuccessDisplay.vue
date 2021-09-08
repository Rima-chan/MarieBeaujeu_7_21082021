<template>
    <div v-if="isSuccess" class="alert alert-success" role="alert">{{ message }}</div>
</template>

<script>
export default {
  name: 'SucessDisplay',
  props: {
    isSuccess: Boolean,
    message: String,
  },
};
</script>

<style scoped>

</style>
