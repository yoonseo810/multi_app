import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllPokemon = createAsyncThunk('pokemon/all', async (url) => {
  const res = await axios.get(url);

  const parsedData = [];

  for (const pokemon of res.data.results) {
    const pokemonRes = await axios.get(pokemon.url);
    const pokemonData = pokemonRes.data;

    parsedData.push(pokemonData);
  }
  return { ...res.data, parsedData };
});
