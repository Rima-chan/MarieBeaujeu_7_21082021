<template>
  <div class="w-100">
    <HeaderAuth />
    <LoginCard />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderAuth from '@/components/HeaderAuth.vue';
import LoginCard from '@/components/LoginCard.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Authentification',
  components: {
    HeaderAuth,
    LoginCard,
    Footer,
  },
};
</script>
