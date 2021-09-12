import { reactive, readonly } from 'vue';

const userState = reactive({
  authenticating: false,
  userInfos: null,
  error: null,
});
const methods = {
  setUser(user) {
    userState.userInfos = user;
    userState.error = null;
    userState.authenticating = true;
    window.localStorage.setItem('userRegistered', JSON.stringify(user)); // Random key for production
    window.localStorage.setItem('xsrfToken', JSON.stringify(userState.userInfos.xsrfToken)); // V2 : Include info in userRegister
  },
  logout() {
    console.log('loug out');
    localStorage.removeItem('userRegistered');
    localStorage.removeItem('xsrfToken');
    userState.userInfos = null;
    userState.authenticating = false;
  },
  getUserName() {
    return userState.userInfos.username;
  },
};
export default {
  userState: readonly(userState),
  methods,
};
