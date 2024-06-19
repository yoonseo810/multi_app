import { createSlice } from '@reduxjs/toolkit';
import { searchPokemon } from '../thunks/pokedex/searchPokemon';
import { fetchFavourites } from '../thunks/pokedex/fetchFavourites';
import { addPokemon } from '../thunks/pokedex/addPokemon';
import { removePokemon } from '../thunks/pokedex/removePokemon';
import { fetchAllPokemon } from '../thunks/pokedex/fetchAllPokemon';

const pokedexSlice = createSlice({
  name: 'pokemon',
  initialState: {
    data: {},
    addedData: {},
    result: {},
    isLoading: false,
    error: null,
    parsedData: {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemon.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllPokemon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.parsedData = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAllPokemon.rejected, (state, action) => {
      state.isLoading = false;
      state.parsedData = {};
      state.error = action.error;
    });
    builder.addCase(searchPokemon.pending, (state, action) => {
      state.isLoading = true;
      state.addedData = {};
    });
    builder.addCase(searchPokemon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.result = action.payload;
      state.error = null;
    });
    builder.addCase(searchPokemon.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.result = {};
    });
    builder.addCase(fetchFavourites.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFavourites.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchFavourites.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.data = {};
    });
    builder.addCase(addPokemon.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addPokemon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addedData = action.payload;
      state.data = [...state.data, action.payload];
    });
    builder.addCase(addPokemon.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.addedData = {};
    });
    builder.addCase(removePokemon.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removePokemon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(
        (pokemon) => pokemon._id !== action.payload.id
      );
      state.error = null;
    });
    builder.addCase(removePokemon.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const pokedexReducer = pokedexSlice.reducer;
