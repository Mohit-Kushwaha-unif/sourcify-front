import
  {
    AUTH_USER,
    AUTH_CHECK,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    USER_ROLE
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