<template>
  <header class="w-100 bg-dark text-white">
    <div class="container">
      <div class="row">
          <nav-bar />
      </div>
    </div>
  </header>
</template>

<script>
import NavBar from './NavBar.vue';

export default {
  components: { NavBar },
  name: 'HeaderHome',
};
</script>

<style scoped>
.logo {
    max-width: 200px;
    max-height: 80px;
}
</style>
