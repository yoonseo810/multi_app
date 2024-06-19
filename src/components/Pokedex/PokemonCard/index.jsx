import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { useThunk } from '../../../hooks/useThunk';
import { addPokemon } from '../../../store';
import DetailsModal from '../DetailsModal';

const PokemonCard = ({ pokemon = {}, favList = [] }) => {
  const { name, abilities, weight, types, stats, sprites } = pokemon;

  const [doAddPokemon, addLoading] = useThunk(addPokemon);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isAlreadyAdded = favList
    ? favList.find((favPokemon) => favPokemon.name === pokemon.name)
    : false;

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

  return (
    <>
      {isOpen && (
        <DetailsModal
          // isAlreadyAdded={isAlreadyAdded}
          // addLoading={addLoading}
          // handleAdd={handleAdd}
          pokemon={pokemon}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-row items-start justify-between">
          <h4 className="font-bold text-large">{name.toUpperCase()}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2 pt-5">
          <Image
            onClick={onOpen}
            alt={name}
            className="object-cover rounded-xl hover:cursor-pointer"
            src={sprites.other['official-artwork'].front_default}
            width={270}
          />
        </CardBody>
        <Button
          isLoading={addLoading}
          onPress={handleAdd}
          isDisabled={isAlreadyAdded}
          className="mx-2"
          color={isAlreadyAdded ? 'default' : 'success'}
        >
          {addLoading
            ? 'Adding'
            : isAlreadyAdded
            ? 'Added'
            : 'Add to Favourites'}
        </Button>
      </Card>
    </>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.object,
  favList: PropTypes.array,
};

export default PokemonCard;
