export const FETCH_HEALTH_RECORDS = 'FETCH_HEALTH_RECORDS';
export const FETCH_HEALTH_RECORDS_SUCCESS = 'FETCH_HEALTH_RECORDS_SUCCESS';
export const FETCH_HEALTH_RECORDS_FAILURE = 'FETCH_HEALTH_RECORDS_FAILURE';
export const FETCH_RECORD_DETAIL = 'FETCH_RECORD_DETAIL';
export const FETCH_RECORD_DETAIL_SUCCESS = 'FETCH_RECORD_DETAIL_SUCCESS';
export const FETCH_RECORD_DETAIL_FAILURE = 'FETCH_RECORD_DETAIL_FAILURE';
export const ADD_HEALTH_RECORD = 'ADD_HEALTH_RECORD';
export const ADD_HEALTH_RECORD_SUCCESS = 'ADD_HEALTH_RECORD_SUCCESS';
export const ADD_HEALTH_RECORD_FAILURE = 'ADD_HEALTH_RECORD_FAILURE';
export const UPDATE_HEALTH_RECORD = 'UPDATE_HEALTH_RECORD';
export const UPDATE_HEALTH_RECORD_SUCCESS = 'UPDATE_HEALTH_RECORD_SUCCESS';
export const UPDATE_HEALTH_RECORD_FAILURE = 'UPDATE_HEALTH_RECORD_FAILURE';
export const GRANT_EMERGENCY_ACCESS = 'GRANT_EMERGENCY_ACCESS';
export const REVOKE_EMERGENCY_ACCESS = 'REVOKE_EMERGENCY_ACCESS';

export const fetchHealthRecords = () => ({
  type: FETCH_HEALTH_RECORDS
});

export const fetchRecordDetail = (recordId) => ({
  type: FETCH_RECORD_DETAIL,
  payload: recordId
});

export const addHealthRecord = (recordData) => ({
  type: ADD_HEALTH_RECORD,
  payload: recordData
});

export const updateHealthRecord = (id, recordData) => ({
  type: UPDATE_HEALTH_RECORD,
  payload: { id, recordData }
});

export const grantEmergencyAccess = (doctorId) => ({
  type: GRANT_EMERGENCY_ACCESS,
  payload: doctorId
});

export const revokeEmergencyAccess = (doctorId) => ({
  type: REVOKE_EMERGENCY_ACCESS,
  payload: doctorId
});
