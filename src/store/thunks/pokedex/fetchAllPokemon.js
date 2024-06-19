import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllPokemon = createAsyncThunk('pokemon/all', async (url) => {
  // const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20');
  const res = await axios.get(url);
  // return res.data;

  // console.log(res.data);
  const parsedData = [];

  for (const pokemon of res.data.results) {
    const pokemonRes = await axios.get(pokemon.url);
    const pokemonData = pokemonRes.data;
    // const name = pokemonData.name;
    // const imgUrl = pokemonData.sprites.other.dream_world.front_default;
    parsedData.push(pokemonData);
  }
  return { ...res.data, parsedData };
});
