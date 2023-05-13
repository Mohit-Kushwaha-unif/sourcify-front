
const initialState = {
  isLoggedIn: false,
  userDetails: {},
  user_role: false,
  accStatus: null,
  Work_segment: []
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
      case 'ACC_STATUS':
      return acc_status(state,payload)
      case 'WORK_SEGEMENT':
      return Work_segment(state,payload)
      
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
  localStorage.setItem("lan","hi")
  localStorage.setItem("isModal", "false")
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
function acc_status(state, payload) {
  
  state.acc_status = payload
  return {
    ...state,
    acc_status : payload
  };
}
function Work_segment(state, payload) {
  
  state.Work_segment = payload
  return {
    ...state,
    Work_segment : payload
  };
}

export default State;