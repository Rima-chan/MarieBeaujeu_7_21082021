<template>
    <router-view />
</template>

<script>
import { provide } from 'vue';
import store from './store';

export default {
  setup() {
    provide('store', store);
  },
};
</script>

<style>
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
