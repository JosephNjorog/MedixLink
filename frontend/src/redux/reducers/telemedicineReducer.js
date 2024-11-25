import { 
  FETCH_SESSIONS_REQUEST, 
  FETCH_SESSIONS_SUCCESS, 
  FETCH_SESSIONS_FAILURE, 
  CREATE_SESSION_REQUEST, 
  CREATE_SESSION_SUCCESS, 
  CREATE_SESSION_FAILURE, 
  JOIN_SESSION_REQUEST, 
  JOIN_SESSION_SUCCESS, 
  JOIN_SESSION_FAILURE, 
  END_SESSION, 
  UPDATE_SESSION_STATUS 
} from '../actions/telemedicineActions';

const initialState = {
    sessions: [],
    currentSession: null,
    loading: false,
    error: null
  };
  
  const telemedicineReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SESSIONS_REQUEST:
      case CREATE_SESSION_REQUEST:
      case JOIN_SESSION_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      
      case FETCH_SESSIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          sessions: action.payload,
          error: null
        };
      
      case CREATE_SESSION_SUCCESS:
        return {
          ...state,
          loading: false,
          sessions: [...state.sessions, action.payload],
          currentSession: action.payload,
          error: null
        };
      
      case JOIN_SESSION_SUCCESS:
        return {
          ...state,
          loading: false,
          currentSession: action.payload,
          error: null
        };
      
      case FETCH_SESSIONS_FAILURE:
      case CREATE_SESSION_FAILURE:
      case JOIN_SESSION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      
      case END_SESSION:
        return {
          ...state,
          currentSession: null,
          sessions: state.sessions.map(session => 
            session._id === action.payload
              ? { ...session, status: 'ended' }
              : session
          )
        };
      
      case UPDATE_SESSION_STATUS:
        return {
          ...state,
          sessions: state.sessions.map(session =>
            session._id === action.payload.sessionId
              ? { ...session, status: action.payload.status }
              : session
          ),
          currentSession: state.currentSession?._id === action.payload.sessionId
            ? { ...state.currentSession, status: action.payload.status }
            : state.currentSession
        };
      
      default:
        return state;
    }
  };
  
  export default telemedicineReducer;