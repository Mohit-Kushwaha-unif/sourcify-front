import
  {
    AUTH_USER,
    AUTH_CHECK,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    USER_ROLE,
    ACC_STATUS,
    WORK_SEGEMENT
  } from '../action-types';

export const set_user_auth = (payload) =>
{
  return {
    type: AUTH_USER,
    payload: payload,
  };
};

export function authCheck()
{
  return {
    type: AUTH_CHECK,
  };
}

export function authLogin(payload)
{
  return {
    type: AUTH_LOGIN,
    payload,
  };
}

export function authLogout()
{
  return {
    type: AUTH_LOGOUT,
  };
}
export function setValue(value) {
    return {
      type: USER_ROLE,
      payload: value
    };
  }
export function acc_status(value) {
    return {
      type: ACC_STATUS,
      payload: value
    };
  }
export function Work_Segment(value) {
    return {
      type: WORK_SEGEMENT,
      payload: value
    };
  }