import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, AccordionItem, Skeleton } from '@nextui-org/react';
import { formattedName } from '../../../utils/helpers';
import Details from '../Details';
import PropTypes from 'prop-types';

const FavouritesList = ({ doFetchFavourites, fetchLoading }) => {
  const { data } = useSelector((state) => state.pokedex);

  useEffect(() => {
    doFetchFavourites();
  }, [doFetchFavourites]);

  const SkeletonTitle = (
    <Skeleton className="rounded-lg">
      <div className="h-7 rounded-lg bg-default-200"></div>
    </Skeleton>
  );

  return (
    <Accordion>
      {fetchLoading &&
        Array(5)
          .fill(0)
          .map((element, index) => (
            <AccordionItem key={index} title={SkeletonTitle}></AccordionItem>
          ))}
      {!fetchLoading &&
        data &&
        data.map((pokemon) => (
          <AccordionItem
            key={pokemon._id}
            aria-label={pokemon.name}
            title={formattedName(pokemon.name)}
          >
            <Details pokemon={pokemon} />
          </AccordionItem>
        ))}
    </Accordion>
  );
};

FavouritesList.propTypes = {
  doFetchFavourites: PropTypes.func,
  fetchLoading: PropTypes.bool,
};

export default FavouritesList;
