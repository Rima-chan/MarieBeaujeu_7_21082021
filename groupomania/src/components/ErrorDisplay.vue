<template>
    <div>
      <!-- <div v-if="isError" v-bind:class="[status === 409 ? 'alert-danger' : 'alert-primary']" class="alert" role="alert">{{ error }}</div> -->
      <div v-if="isError" class="alert alert-danger" role="alert">{{ error }}</div>
    </div>
</template>

<script>
export default {
  name: 'ErrorDisplay',
  props: {
    isError: Boolean,
    status: Number,
    error: String,
  },
  // Faire le setup ?
};
</script>

<style scoped>

</style>
