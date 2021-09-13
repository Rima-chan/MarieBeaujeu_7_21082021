<template>
    <div class="container">
        <div class="row">
            <h1 class="col mt-5">{{ welcome }}</h1>
            <div class="cardGif my-5">
                <img src="https://media.giphy.com/media/OK914NO5d8ey9sSNAQ/giphy.gif?cid=ecf05e47m3zjrarky5nwm3yyqigzggrswz8t171zzdpgy7yo&rid=giphy.gif&ct=g" alt="Gif de bienvenue" class="welcomeGif img-fluid">
            </div>
        </div>
    </div>
</template>

<script>
import { computed, inject } from 'vue';
import useUserInfos from '../composables/useUserInfos';

export default {
  name: 'HomePage',
  setup() {
    const store = inject('store');
    const { username } = useUserInfos();
    const welcome = computed(() => (username?.value ? `Bienvenue ${username.value} 👋` : 'Bienvenue 👋'));
    return {
      store,
      username,
      welcome,
    };
  },
};

</script>

<style>
.welcomeGif {
  max-width: 480px;
  max-height: 480px;
  width: 100%;
  height: auto;
}
</style>
