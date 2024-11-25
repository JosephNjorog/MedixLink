import axios from 'axios';

// Action Types
export const FETCH_SESSIONS_REQUEST = 'FETCH_SESSIONS_REQUEST';
export const FETCH_SESSIONS_SUCCESS = 'FETCH_SESSIONS_SUCCESS';
export const FETCH_SESSIONS_FAILURE = 'FETCH_SESSIONS_FAILURE';
export const CREATE_SESSION_REQUEST = 'CREATE_SESSION_REQUEST';
export const CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS';
export const CREATE_SESSION_FAILURE = 'CREATE_SESSION_FAILURE';
export const JOIN_SESSION_REQUEST = 'JOIN_SESSION_REQUEST';
export const JOIN_SESSION_SUCCESS = 'JOIN_SESSION_SUCCESS';
export const JOIN_SESSION_FAILURE = 'JOIN_SESSION_FAILURE';
export const END_SESSION = 'END_SESSION';
export const UPDATE_SESSION_STATUS = 'UPDATE_SESSION_STATUS';

// Action Creators
export const fetchTelemedicineSessions = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SESSIONS_REQUEST });
    const response = await axios.get('/api/telemedicine/sessions');
    dispatch({
      type: FETCH_SESSIONS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_SESSIONS_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch sessions'
    });
  }
};

export const createTelemedicineSession = (sessionData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SESSION_REQUEST });
    const response = await axios.post('/api/telemedicine/sessions', sessionData);
    dispatch({
      type: CREATE_SESSION_SUCCESS,
      payload: response.data
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: CREATE_SESSION_FAILURE,
      payload: error.response?.data?.message || 'Failed to create session'
    });
    throw error;
  }
};

export const joinTelemedicineSession = (sessionId) => async (dispatch) => {
  try {
    dispatch({ type: JOIN_SESSION_REQUEST });
    const response = await axios.post(`/api/telemedicine/sessions/${sessionId}/join`);
    dispatch({
      type: JOIN_SESSION_SUCCESS,
      payload: response.data
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: JOIN_SESSION_FAILURE,
      payload: error.response?.data?.message || 'Failed to join session'
    });
    throw error;
  }
};

export const endTelemedicineSession = (sessionId) => async (dispatch) => {
  try {
    await axios.post(`/api/telemedicine/sessions/${sessionId}/end`);
    dispatch({ type: END_SESSION, payload: sessionId });
  } catch (error) {
    console.error('Failed to end session:', error);
  }
};

export const updateSessionStatus = (sessionId, status) => ({
  type: UPDATE_SESSION_STATUS,
  payload: { sessionId, status }
});