
export default function useAuth() {
    const setUser = (user) => {
      userState.userInfos = user;
      userState.error = null;
      userState.authenticating = true;
      window.localStorage.setItem('userRegistered', JSON.stringify(user)); // Random key for production
      window.localStorage.setItem('xsrfToken', JSON.stringify(userState.userInfos.xsrfToken)); // V2 : Include info in userRegister
    };
    const logout = () => {
      console.log('logout');
    };
    return {
      userState: readonly(userState),
      setUser,
      logout,
    };
  }