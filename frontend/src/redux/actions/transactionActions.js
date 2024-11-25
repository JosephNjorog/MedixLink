import axios from 'axios';

// Action Types
export const FETCH_TRANSACTIONS_REQUEST = 'FETCH_TRANSACTIONS_REQUEST';
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';
export const FETCH_TRANSACTIONS_FAILURE = 'FETCH_TRANSACTIONS_FAILURE';
export const CREATE_TRANSACTION_REQUEST = 'CREATE_TRANSACTION_REQUEST';
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS';
export const CREATE_TRANSACTION_FAILURE = 'CREATE_TRANSACTION_FAILURE';
export const FETCH_PACKAGES_REQUEST = 'FETCH_PACKAGES_REQUEST';
export const FETCH_PACKAGES_SUCCESS = 'FETCH_PACKAGES_SUCCESS';
export const FETCH_PACKAGES_FAILURE = 'FETCH_PACKAGES_FAILURE';
export const PROCESS_PAYMENT_REQUEST = 'PROCESS_PAYMENT_REQUEST';
export const PROCESS_PAYMENT_SUCCESS = 'PROCESS_PAYMENT_SUCCESS';
export const PROCESS_PAYMENT_FAILURE = 'PROCESS_PAYMENT_FAILURE';

// Action Creators
export const fetchTransactions = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TRANSACTIONS_REQUEST });
    const response = await axios.get('/api/transactions');
    dispatch({
      type: FETCH_TRANSACTIONS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_TRANSACTIONS_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch transactions'
    });
  }
};

export const createTransaction = (transactionData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TRANSACTION_REQUEST });
    const response = await axios.post('/api/transactions', transactionData);
    dispatch({
      type: CREATE_TRANSACTION_SUCCESS,
      payload: response.data
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: CREATE_TRANSACTION_FAILURE,
      payload: error.response?.data?.message || 'Failed to create transaction'
    });
    throw error;
  }
};

export const fetchPackages = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PACKAGES_REQUEST });
    const response = await axios.get('/api/packages');
    dispatch({
      type: FETCH_PACKAGES_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_PACKAGES_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch packages'
    });
  }
};

export const processPayment = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: PROCESS_PAYMENT_REQUEST });
    const response = await axios.post('/api/transactions/payment', paymentData);
    dispatch({
      type: PROCESS_PAYMENT_SUCCESS,
      payload: response.data
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: PROCESS_PAYMENT_FAILURE,
      payload: error.response?.data?.message || 'Failed to process payment'
    });
    throw error;
  }
};
