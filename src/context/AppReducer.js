import { actions } from '../utils/constants';

const AppReducer = (state, action) => {
  switch (action.type) {
    case actions.GET_TRANSACTIONS:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case actions.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case actions.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case actions.TRANSACTION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default AppReducer;
