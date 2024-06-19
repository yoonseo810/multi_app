import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { POKEMON_URL } from '../../../utils/constants';

export const searchPokemon = createAsyncThunk(
  'pokemon/search',
  async (searchParam) => {
    const res = await axios.get(`${POKEMON_URL}/${searchParam}`);
    return res.data;
  }
);
