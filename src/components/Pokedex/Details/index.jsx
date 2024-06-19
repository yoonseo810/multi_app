import PropTypes from 'prop-types';
import { Image, Chip, Button } from '@nextui-org/react';
import { formattedName } from '../../../utils/helpers';
import { pokemonTypeColors } from '../../../utils/constants';
import Stats from '../Stats';
import { useThunk } from '../../../hooks/useThunk';
import { removePokemon } from '../../../store';

const Details = ({ pokemon = {} }) => {
  const [doRemovePokemon, removeLoading] = useThunk(removePokemon);
  const { abilities, imgUrl, name, pokemonType, stats, weight, _id } = pokemon;

  const chipColor = pokemonTypeColors[pokemonType[0] ?? 'default'];

  const handleRemove = () => {
    doRemovePokemon(_id);
  };

  return (
    <div className="flex-wrap overflow-visible py-2 pt-5 flex flex-row gap-5 justify-around">
      <Image
        alt={name}
        className="object-cover rounded-xl"
        src={imgUrl}
        width={270}
      />
      <div>{<Stats stats={stats} />}</div>
      <div className="flex flex-col gap-3 text-lg">
        <div>
          Name: <span>{formattedName(name)}</span>
        </div>
        <div>
          Weight: <span>{weight}</span>
        </div>
        <div>
          Type:{' '}
          {pokemonType.map((type, index) => (
            <Chip
              key={index}
              className={`mx-0.5 ${pokemonTypeColors[type ?? 'default']}`}
            >
              {type}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-0.5">
          Abilities:{' '}
          {abilities.map((ability, index) => (
            <Chip className={`mx-0.5 ${chipColor}`} key={index}>
              {ability}
            </Chip>
          ))}
        </div>
        <Button
          isLoading={removeLoading}
          onPress={handleRemove}
          color="danger"
          className="mt-10"
        >
          {removeLoading ? 'Removing' : 'Remove'}
        </Button>
      </div>
    </div>
  );
};

Details.propTypes = {
  pokemon: PropTypes.object,
};

export default Details;
