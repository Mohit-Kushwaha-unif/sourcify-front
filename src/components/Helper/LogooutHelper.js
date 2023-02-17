export const logout = () => {
    console.log('in logout 1');
    localStorage.clear()
    localStorage.setItem('isLoggedIn', false);
    window.location = '/login';
  };