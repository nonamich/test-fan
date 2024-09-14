import { Container, Group, Burger, Button, Menu, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/auth/AuthContext';

import classes from './Header.module.css';

const links = [{ href: '/', label: 'Home' }];

export const Header = () => {
  const { user } = useAuth();
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Button key={link.label} component={Link} to={link.href}>
      {link.label}
    </Button>
  ));

  return (
    <header>
      <Container className={classes.inner}>
        <h1>Logo</h1>
        <Group gap={5} visibleFrom="xs">
          {items}
          {!!user && <ButtonUser />}
          {!user && <ButtonAuth />}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
};

const ButtonUser = () => {
  const { logout, user } = useAuth();

  if (!user) {
    return <></>;
  }

  return (
    <Menu shadow="md" width={200} trigger="hover">
      <Menu.Target>
        <Button>Logged In: {user.name}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          component={Link}
          to="/user"
          leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
        >
          Profile
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          onClick={() => logout()}
          color="red"
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const ButtonAuth = () => {
  return (
    <Button component={Link} to="/login">
      Login
    </Button>
  );
};
