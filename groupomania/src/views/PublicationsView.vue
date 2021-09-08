<template>
  <div class="w-100">
    <header-home />
    <AllPublications />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderHome from '@/components/HeaderHome.vue';
import Footer from '@/components/Footer.vue';
import AllPublications from '@/components/AllPublications.vue';

export default {
  name: 'Home',
  components: {
    HeaderHome,
    AllPublications,
    Footer,
  },
};
</script>
