export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const VERIFY_TOKEN = 'VERIFY_TOKEN';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const login = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials
});

export const register = (userData) => ({
  type: REGISTER_REQUEST,
  payload: userData
});

export const logout = () => ({
  type: LOGOUT
});

export const verifyToken = () => ({
  type: VERIFY_TOKEN
});

export const resetPassword = (email) => ({
  type: RESET_PASSWORD_REQUEST,
  payload: email
});