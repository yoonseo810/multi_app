import PropTypes from 'prop-types';

const Header = ({ title = '' }) => {
  return (
    <h2 className="text-5xl text-emerald-400 tracking-wider m-0 pb-20 ">
      {title}
    </h2>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
