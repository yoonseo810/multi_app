import { useReducer, createContext } from 'react';
import AppReducer from './AppReducer';
import { actions } from '../utils/constants';
import axiosInstance from '../utils/axiosInstance';

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getTransactions = async () => {
    try {
      const res = await axiosInstance.get('/api/transactions/all');
      const { data } = res.data;
      dispatch({
        type: actions.GET_TRANSACTIONS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: actions.TRANSACTION_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axiosInstance.delete(`/api/transactions/delete/${id}`);
      dispatch({
        type: actions.DELETE_TRANSACTION,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: actions.TRANSACTION_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const res = await axiosInstance.post(
        '/api/transactions/add',
        transaction
      );
      dispatch({
        type: actions.ADD_TRANSACTION,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: actions.TRANSACTION_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
