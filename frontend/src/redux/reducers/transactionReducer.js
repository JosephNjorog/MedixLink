import {
  FETCH_TRANSACTIONS_REQUEST,
  CREATE_TRANSACTION_REQUEST,
  FETCH_PACKAGES_REQUEST,
  PROCESS_PAYMENT_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  CREATE_TRANSACTION_SUCCESS,
  FETCH_PACKAGES_SUCCESS,
  PROCESS_PAYMENT_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  CREATE_TRANSACTION_FAILURE,
  FETCH_PACKAGES_FAILURE,
  PROCESS_PAYMENT_FAILURE
} from '../actions/transactionActionTypes';

const initialState = {
    transactions: [],
    packages: [],
    loading: false,
    error: null,
    currentTransaction: null,
    paymentStatus: null
  };
  
  const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TRANSACTIONS_REQUEST:
      case CREATE_TRANSACTION_REQUEST:
      case FETCH_PACKAGES_REQUEST:
      case PROCESS_PAYMENT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      
      case FETCH_TRANSACTIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          transactions: action.payload,
          error: null
        };
      
      case CREATE_TRANSACTION_SUCCESS:
        return {
          ...state,
          loading: false,
          transactions: [...state.transactions, action.payload],
          currentTransaction: action.payload,
          error: null
        };
      
      case FETCH_PACKAGES_SUCCESS:
        return {
          ...state,
          loading: false,
          packages: action.payload,
          error: null
        };
      
      case PROCESS_PAYMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          paymentStatus: 'success',
          currentTransaction: {
            ...state.currentTransaction,
            status: 'completed',
            paymentDetails: action.payload
          },
          error: null
        };
      
      case FETCH_TRANSACTIONS_FAILURE:
      case CREATE_TRANSACTION_FAILURE:
      case FETCH_PACKAGES_FAILURE:
      case PROCESS_PAYMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          paymentStatus: action.type === PROCESS_PAYMENT_FAILURE ? 'failed' : state.paymentStatus
        };
      
      default:
        return state;
    }
  };
  
  export default transactionReducer;