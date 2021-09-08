<template>
  <div class="w-100">
    <header-home />
    <home-page />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderHome from '@/components/HeaderHome.vue';
import Footer from '@/components/Footer.vue';
import HomePage from '../components/HomePage.vue';

export default {
  name: 'Home',
  components: {
    HeaderHome,
    Footer,
    HomePage,
  },
  setup() {
    const activeNavLink = 1;
    return {
      activeNavLink,
    };
  },
};
</script>
