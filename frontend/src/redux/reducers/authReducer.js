const LOGIN_REQUEST = 'LOGIN_REQUEST';
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const REGISTER_FAILURE = 'REGISTER_FAILURE';
const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
const LOGOUT = 'LOGOUT';
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    isAuthenticated: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_REQUEST:
      case RESET_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      
      case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token,
          error: null
        };
      
      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        };
      
      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
      case RESET_PASSWORD_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          isAuthenticated: false
        };
      
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        };
      
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        };
      
      default:
        return state;
    }
  };
  
  export default authReducer;