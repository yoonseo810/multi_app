import { useEffect, useState } from 'react';
import { useThunk } from '../../../hooks/useThunk';
import { fetchAllPokemon } from '../../../store';
import { useSelector } from 'react-redux';
import { Pagination, Button, Spinner } from '@nextui-org/react';
import PokemonCard from '../PokemonCard';
import ListSkeleton from '../ListSkeleton';

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedPokemon, setSelectedPokemon] = useState({});
  const [doFetchAllPokemon, fetchLoading] = useThunk(fetchAllPokemon);
  const {
    parsedData: { next = '', previous = '', parsedData = [] },
    data,
  } = useSelector((state) => state.pokedex);

  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    doFetchAllPokemon('https://pokeapi.co/api/v2/pokemon/?limit=20');
  }, [doFetchAllPokemon]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [parsedData]);

  const handleNext = () => {
    if (!next) return;

    doFetchAllPokemon(next);
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (!previous) return;

    doFetchAllPokemon(previous);
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-flow-row grid-cols-4 gap-4">
        {fetchLoading &&
          Array(20)
            .fill(0)
            .map((_, index) => <ListSkeleton key={index} />)}
        {!fetchLoading &&
          data &&
          parsedData?.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} favList={data} />
          ))}
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          isDisabled={fetchLoading || !previous}
          size="sm"
          variant="flat"
          color="success"
          onPress={handlePrevious}
        >
          Previous
        </Button>
        <Pagination
          color="success"
          page={fetchLoading ? <Spinner /> : currentPage}
        />
        <Button
          isDisabled={fetchLoading || !next}
          size="sm"
          variant="flat"
          color="success"
          onPress={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PokemonList;
