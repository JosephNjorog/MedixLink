import axios from 'axios';

// Action Types
export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';
export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
export const ChangePasswordRequest = 'ChangePasswordRequest';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

// Action Creators
export const fetchProfile = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PROFILE_REQUEST });
    const response = await axios.get('/api/profile');
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROFILE_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch profile'
    });
  }
};

export const updateProfile = (profileData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const response = await axios.put('/api/profile', profileData);
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response?.data?.message || 'Failed to update profile'
    });
  }
};

export const changePassword = (passwordData) => async (dispatch) => {
  try {
    dispatch({ type: ChangePasswordRequest });
    await axios.put('/api/profile/password', passwordData);
    dispatch({ type: CHANGE_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAILURE,
      payload: error.response?.data?.message || 'Failed to change password'
    });
  }
};