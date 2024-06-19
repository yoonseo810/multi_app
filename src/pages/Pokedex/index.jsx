import Header from '../../components/common/Header';
import PokedexTab from '../../components/Pokedex/PokedexTab';

const Pokedex = () => {
  return (
    <div className="flex flex-col items-center m-0 pb-10">
      <Header title="Pokedex" />
      <PokedexTab />
    </div>
  );
};

export default Pokedex;
