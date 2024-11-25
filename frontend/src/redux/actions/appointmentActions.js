export const FETCH_APPOINTMENTS = 'FETCH_APPOINTMENTS';
export const FETCH_APPOINTMENTS_SUCCESS = 'FETCH_APPOINTMENTS_SUCCESS';
export const FETCH_APPOINTMENTS_FAILURE = 'FETCH_APPOINTMENTS_FAILURE';
export const CREATE_APPOINTMENT = 'CREATE_APPOINTMENT';
export const CREATE_APPOINTMENT_SUCCESS = 'CREATE_APPOINTMENT_SUCCESS';
export const CREATE_APPOINTMENT_FAILURE = 'CREATE_APPOINTMENT_FAILURE';
export const UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT';
export const UPDATE_APPOINTMENT_SUCCESS = 'UPDATE_APPOINTMENT_SUCCESS';
export const UPDATE_APPOINTMENT_FAILURE = 'UPDATE_APPOINTMENT_FAILURE';
export const DELETE_APPOINTMENT = 'DELETE_APPOINTMENT';
export const DELETE_APPOINTMENT_SUCCESS = 'DELETE_APPOINTMENT_SUCCESS';
export const DELETE_APPOINTMENT_FAILURE = 'DELETE_APPOINTMENT_FAILURE';

export const fetchAppointments = () => ({
  type: FETCH_APPOINTMENTS
});

export const createAppointment = (appointmentData) => ({
  type: CREATE_APPOINTMENT,
  payload: appointmentData
});

export const updateAppointment = (id, appointmentData) => ({
  type: UPDATE_APPOINTMENT,
  payload: { id, appointmentData }
});

export const deleteAppointment = (id) => ({
  type: DELETE_APPOINTMENT,
  payload: id
});