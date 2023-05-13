export const logout = () => {
    console.log('in logout 1');
    localStorage.clear()
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem("lan", "en");
    localStorage.setItem("isModal", false);
    window.location = '/login';
  };