const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';
const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';

const initialState = {
    profile: null,
    loading: false,
    error: null,
    passwordChangeSuccess: false
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PROFILE_REQUEST:
      case UPDATE_PROFILE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      
      case FETCH_PROFILE_SUCCESS:
      case UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          profile: action.payload,
          error: null
        };
      
      case FETCH_PROFILE_FAILURE:
      case UPDATE_PROFILE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      
      case CHANGE_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          passwordChangeSuccess: false
        };
      
      case CHANGE_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          passwordChangeSuccess: true
        };
      
      case CHANGE_PASSWORD_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          passwordChangeSuccess: false
        };
      
      default:
        return state;
    }
  };
  
  export default profileReducer;