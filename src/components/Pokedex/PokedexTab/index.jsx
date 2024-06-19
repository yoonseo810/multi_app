import { useEffect, useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import SearchPokemon from '../SearchPokemon';
import FavouritesList from '../FavouritesList';
import { useThunk } from '../../../hooks/useThunk';
import { fetchFavourites } from '../../../store';
import PokemonList from '../PokemonList';

const PokedexTab = () => {
  const [selected, setSelected] = useState('list');
  const [searchParam, setSearchParam] = useState('');

  const [doFetchFavourites, fetchLoading] = useThunk(fetchFavourites);

  useEffect(() => {
    doFetchFavourites();
  }, [doFetchFavourites]);

  return (
    <div className="flex w-9/12 flex-col">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="list" title="Pokemon List">
          <PokemonList />
        </Tab>
        <Tab key="search" title="Search">
          <SearchPokemon
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            doFetchFavourites={doFetchFavourites}
          />
        </Tab>
        <Tab key="favourite" title="Favourites">
          <FavouritesList
            doFetchFavourites={doFetchFavourites}
            fetchLoading={fetchLoading}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default PokedexTab;
