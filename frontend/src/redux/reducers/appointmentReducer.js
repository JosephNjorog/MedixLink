const FETCH_APPOINTMENTS = 'FETCH_APPOINTMENTS';
const FETCH_APPOINTMENTS_SUCCESS = 'FETCH_APPOINTMENTS_SUCCESS';
const FETCH_APPOINTMENTS_FAILURE = 'FETCH_APPOINTMENTS_FAILURE';
const CREATE_APPOINTMENT = 'CREATE_APPOINTMENT';
const CREATE_APPOINTMENT_SUCCESS = 'CREATE_APPOINTMENT_SUCCESS';
const CREATE_APPOINTMENT_FAILURE = 'CREATE_APPOINTMENT_FAILURE';
const UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT';
const UPDATE_APPOINTMENT_SUCCESS = 'UPDATE_APPOINTMENT_SUCCESS';
const UPDATE_APPOINTMENT_FAILURE = 'UPDATE_APPOINTMENT_FAILURE';
const DELETE_APPOINTMENT = 'DELETE_APPOINTMENT';
const DELETE_APPOINTMENT_SUCCESS = 'DELETE_APPOINTMENT_SUCCESS';
const DELETE_APPOINTMENT_FAILURE = 'DELETE_APPOINTMENT_FAILURE';

const initialState = {
    appointments: [],
    loading: false,
    error: null,
    currentAppointment: null
  };
  
  const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_APPOINTMENTS:
        return {
          ...state,
          loading: true,
          error: null
        };
      
      case FETCH_APPOINTMENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          appointments: action.payload
        };
      
      case FETCH_APPOINTMENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      
      case CREATE_APPOINTMENT:
        return {
          ...state,
          loading: true,
          error: null
        };
      
      case CREATE_APPOINTMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          appointments: [...state.appointments, action.payload],
          currentAppointment: action.payload
        };
      
      case CREATE_APPOINTMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      
      case UPDATE_APPOINTMENT:
        return {
          ...state,
          loading: true,
          error: null
        };
      
      case UPDATE_APPOINTMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          appointments: state.appointments.map(appointment =>
            appointment._id === action.payload._id ? action.payload : appointment
          ),
          currentAppointment: action.payload
        };
      
      case UPDATE_APPOINTMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      
      case DELETE_APPOINTMENT:
        return {
          ...state,
          loading: true,
          error: null
        };
      
      case DELETE_APPOINTMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          appointments: state.appointments.filter(
            appointment => appointment._id !== action.payload
          ),
          currentAppointment: null
        };
      
      case DELETE_APPOINTMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      
      default:
        return state;
    }
  };
  
  export default appointmentReducer;