import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
import {
  navBarItemsForNonUsers,
  navBarItemsForUsers,
} from '../../utils/constants';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../store';
import { useThunk } from '../../hooks/useThunk';
import { useEffect } from 'react';

const NavBar = () => {
  const token = localStorage.getItem('token') ?? '';
  const [doGetUserInfo, getUserInfoLoading] = useThunk(getUserInfo);
  const { user, getUserInfoSuccess } = useSelector((state) => state.users);

  useEffect(() => {
    if (token) {
      doGetUserInfo();
    }
  }, [token, doGetUserInfo]);

  return (
    <Navbar className="bg-gray-300 mb-10">
      <NavbarBrand>
        {!getUserInfoLoading &&
          getUserInfoSuccess &&
          user?.fullName?.toUpperCase()}
      </NavbarBrand>
      {!getUserInfoLoading && getUserInfoSuccess && user?.fullName && (
        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          {navBarItemsForUsers.map((item) => (
            <NavbarItem key={item.id}>
              <Link color="foreground" href={item.linkTo}>
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        {!getUserInfoLoading && getUserInfoSuccess && user?.fullName && (
          <NavbarItem key="logout">
            <Link href="/login">
              <Button
                // as={Link}
                color="danger"
                variant="flat"
                onPress={() => {
                  localStorage.clear();
                }}
              >
                Log Out
              </Button>
            </Link>
          </NavbarItem>
        )}
        {!getUserInfoLoading &&
          getUserInfoSuccess &&
          !user?.fullName &&
          navBarItemsForNonUsers.map((item) => (
            <NavbarItem key={item.id}>
              <Button
                as={Link}
                color="primary"
                href={item.linkTo}
                variant="flat"
              >
                {item.label}
              </Button>
            </NavbarItem>
          ))}
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
