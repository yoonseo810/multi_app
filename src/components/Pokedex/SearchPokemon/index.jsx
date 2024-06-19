import PropTypes from 'prop-types';
import { Button, Input } from '@nextui-org/react';
import { useThunk } from '../../../hooks/useThunk';
import { searchPokemon } from '../../../store';
import { useSelector } from 'react-redux';
import CardSkeleton from '../CardSkeleton';
import DetailsCard from '../DetailsCard';
import { useEffect } from 'react';

const SearchPokemon = ({
  doFetchFavourites = () => {},
  searchParam = '',
  setSearchParam = () => {},
}) => {
  const [doSearchPokemon, searchPokemonLoading] = useThunk(searchPokemon);

  const { result, error } = useSelector((state) => state.pokedex);

  const handleSearch = (e) => {
    e.preventDefault();
    doSearchPokemon(searchParam.toLowerCase());
  };

  useEffect(() => {
    doFetchFavourites();
  }, [doFetchFavourites]);

  return (
    <div className="w-full flex flex-col gap-16">
      <form
        onSubmit={handleSearch}
        className="flex flex-row items-stretch gap-5"
      >
        <Input
          isRequired
          label="Search"
          placeholder="Type your pokemon name or pokemon number"
          value={searchParam}
          onValueChange={setSearchParam}
          isClearable
        />
        <Button
          isDisabled={searchParam === ''}
          onPress={() => doSearchPokemon(searchParam.toLowerCase())}
          color="secondary"
        >
          Search
        </Button>
      </form>
      {searchPokemonLoading && <CardSkeleton />}
      {!searchPokemonLoading && error && (
        <>
          <h1 className="text-3xl text-red-600">
            No results were found. Please search again.
          </h1>
        </>
      )}
      {!searchPokemonLoading && result && result.name && (
        <DetailsCard pokemon={result} />
      )}
    </div>
  );
};

SearchPokemon.propTypes = {
  doFetchFavourites: PropTypes.func,
  searchParam: PropTypes.string,
  setSearchParam: PropTypes.func,
};

export default SearchPokemon;
