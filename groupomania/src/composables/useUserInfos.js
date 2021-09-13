import { toRefs } from '@vue/reactivity';
import { ref, reactive } from 'vue';

export default function useUserInfo() {
  const getUserFailed = ref(false);
  const userRegistered = reactive({
    userId: null,
    isAdmin: '',
    imageProfil: null,
    username: '',
    profilPicture: null,
  });
  const userInLocalStorage = JSON.parse(localStorage.getItem('userRegistered'));
  if (!userInLocalStorage) {
    getUserFailed.value = true;
  } else {
    userRegistered.userId = parseInt(userInLocalStorage.userId, 10);
    userRegistered.isAdmin = userInLocalStorage.isAdmin;
    userRegistered.imageProfil = userInLocalStorage.imageUrl;
    userRegistered.profilPicture = JSON.parse(localStorage.getItem('profilPicture'));
    userRegistered.username = userInLocalStorage.username;
  }
  return {
    ...toRefs(userRegistered),
    getUserFailed,
  };
}
