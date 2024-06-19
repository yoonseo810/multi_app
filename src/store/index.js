import { configureStore } from '@reduxjs/toolkit';
import { transactionsReducer } from './slices/transactionSlice';
import { usersReducer } from './slices/userSlice';
import { pokedexReducer } from './slices/pokedexSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    users: usersReducer,
    pokedex: pokedexReducer,
  },
});

setupListeners(store.dispatch);

export * from './thunks/transaction/fetchTransactions';
export * from './thunks/transaction/deleteTransaction';
export * from './thunks/transaction/addTransaction';
export * from './thunks/user/logUserIn';
export * from './thunks/user/getUserInfo';
export * from './thunks/user/registerUser';
export * from './thunks/pokedex/fetchAllPokemon';
export * from './thunks/pokedex/searchPokemon';
export * from './thunks/pokedex/fetchFavourites';
export * from './thunks/pokedex/addPokemon';
export * from './thunks/pokedex/removePokemon';
