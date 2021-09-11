<template>
  <div class="w-100">
    <header-home />
    <profil-card />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import { toRefs } from '@vue/runtime-core';
// import { useRoute } from 'vue-router';
import HeaderHome from '@/components/HeaderHome.vue';
import Footer from '@/components/Footer.vue';
import ProfilCard from '../components/ProfilCard.vue';

export default {
  name: 'Profil',
  components: {
    HeaderHome,
    ProfilCard,
    Footer,
  },
  props: {
    userId: String, // Normalement string ok avec backend
  },
  setup(props) {
    // const route = useRoute();
    const { userId } = parseInt(toRefs(props), 10);
    console.log(userId);
    return {
    };
  },
};
</script>
