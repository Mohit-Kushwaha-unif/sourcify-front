import { AUTH_USER } from '../action-types';

const initialState = {
  isLoggedIn: false,
  userDetails: {},
  user_role: false
};

const State = (state = initialState, { type, payload }) => {
  console.warn(' iam in redux');
  console.warn({ type,payload });
  switch (type) {
    case 'AUTH_LOGIN':
      return login(state, payload);
    case 'AUTH_USER':
      return setUserDetails(state, payload);
    case 'AUTH_LOGOUT':
      return logout(state);
      case 'USER_ROLE':
      return user_Role(state,payload)
    default:
      return state;
  }
};

function setUserDetails(state, payload) {
  console.warn({ 'payload-new': payload });
  state.userDetails = payload.data;
  return {
    state,
  };
}
function login(state, payload) {
  localStorage.setItem('access_token', payload.data.access_token);
  localStorage.setItem('isLoggedIn', true);
  state.isLoggedIn = true;
  return {
    isLoggedIn: true,
  };
}

function logout(state) {
  console.log('logout');
  localStorage.setItem('isLoggedIn', false);
  localStorage.removeItem('access_token');
  state.userDetails = {};
  return {
    isLoggedIn: false,
  };
}
function user_Role(state, payload) {
  localStorage.setItem('isLoggedIn', true);
  state.user_role = payload
  return {
    user_role : payload
  };
}

export default State;