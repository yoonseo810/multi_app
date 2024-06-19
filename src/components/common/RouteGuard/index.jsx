import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PUBLIC_PATHS = ['/', '/login', '/register'];

const RouteGuard = ({ children }) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  const token = localStorage.getItem('token') ?? '';

  const authCheck = () => {
    const path = window.location.pathname;
    if (!token && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      navigate('/login');
      navigate(0);
    } else {
      setAuthorized(true);
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  return <>{authorized && children}</>;
};

RouteGuard.propTypes = {
  children: PropTypes.any,
};

export default RouteGuard;
