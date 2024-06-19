import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Chip,
} from '@nextui-org/react';
import { pokemonTypeColors } from '../../../utils/constants';
import Stats from '../Stats';
import { formattedName } from '../../../utils/helpers';
import { useThunk } from '../../../hooks/useThunk';
import { addPokemon } from '../../../store';
import { useSelector } from 'react-redux';

const DetailsCard = ({ pokemon }) => {
  const { name, abilities, weight, types, stats, sprites } = pokemon;

  const [doAddPokemon, addLoading] = useThunk(addPokemon);

  const { data } = useSelector((state) => state.pokedex);

  const chipColor = pokemonTypeColors[types[0].type.name ?? 'default'];

  const handleAdd = () => {
    const payloadObj = {
      name,
      weight,
      pokemonType: types.map((type) => type.type.name),
      abilities: abilities.map((ability) => ability.ability.name),
      stats,
      imgUrl: sprites.other['official-artwork'].front_default ?? '',
    };
    doAddPokemon(payloadObj);
  };

  const isAddedToFavourites = data?.find(
    (pokemon) => pokemon.name.toLowerCase() === name
  );

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-row items-start justify-between">
        <h4 className="font-bold text-2xl">{name.toUpperCase()}</h4>
        {!isAddedToFavourites && (
          <Button isLoading={addLoading} onPress={handleAdd} color="success">
            {addLoading ? 'Adding' : 'Add to Favourites'}
          </Button>
        )}
      </CardHeader>
      {/* <CardBody className="flex-wrap overflow-visible py-2 pt-5 flex flex-row gap-10 justify-around"> */}
      <CardBody className="overflow-visible py-2 pt-5 grid grid-cols-3 justify-around gap-5">
        <Image
          alt={name}
          className="object-cover rounded-xl"
          src={sprites.other['official-artwork'].front_default}
          width={270}
        />
        <div className="flex flex-col gap-3 text-lg">
          <div>
            Name: <span>{formattedName(name)}</span>
          </div>
          <div>
            Weight: <span>{weight}</span>
          </div>
          <div>
            Type:{' '}
            {types.map((type, index) => (
              <Chip
                key={index}
                className={`mx-0.5 ${
                  pokemonTypeColors[type.type.name ?? 'default']
                }`}
              >
                {type.type.name}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-0.5">
            Abilities:{' '}
            {abilities.map((ability, index) => (
              <Chip className={`mx-0.5 ${chipColor}`} key={index}>
                {ability.ability.name}
              </Chip>
            ))}
          </div>
        </div>
        <div>{<Stats stats={stats} />}</div>
      </CardBody>
    </Card>
  );
};

DetailsCard.propTypes = {
  pokemon: PropTypes.object,
};
export default DetailsCard;
