const initialState = {
    records: [],
    currentRecord: null,
    loading: false,
    error: null,
    emergencyAccess: {
      granted: false,
      grantedTo: null,
      expiresAt: null
    }
  };
  
  const healthRecordReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_HEALTH_RECORDS:
      case FETCH_RECORD_DETAIL:
      case ADD_HEALTH_RECORD:
      case UPDATE_HEALTH_RECORD:
        return {
          ...state,
          loading: true,
          error: null
        };
      
      case FETCH_HEALTH_RECORDS_SUCCESS:
        return {
          ...state,
          loading: false,
          records: action.payload
        };
      
      case FETCH_RECORD_DETAIL_SUCCESS:
        return {
          ...state,
          loading: false,
          currentRecord: action.payload
        };
      
      case ADD_HEALTH_RECORD_SUCCESS:
        return {
          ...state,
          loading: false,
          records: [...state.records, action.payload],
          currentRecord: action.payload
        };
      
      case UPDATE_HEALTH_RECORD_SUCCESS:
        return {
          ...state,
          loading: false,
          records: state.records.map(record =>
            record._id === action.payload._id ? action.payload : record
          ),
          currentRecord: action.payload
        };
      
      case FETCH_HEALTH_RECORDS_FAILURE:
      case FETCH_RECORD_DETAIL_FAILURE:
      case ADD_HEALTH_RECORD_FAILURE:
      case UPDATE_HEALTH_RECORD_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      
      case GRANT_EMERGENCY_ACCESS:
        return {
          ...state,
          emergencyAccess: {
            granted: true,
            grantedTo: action.payload,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
          }
        };
      
      case REVOKE_EMERGENCY_ACCESS:
        return {
          ...state,
          emergencyAccess: {
            granted: false,
            grantedTo: null,
            expiresAt: null
          }
        };
      
      default:
        return state;
    }
  };
  
  export default healthRecordReducer;