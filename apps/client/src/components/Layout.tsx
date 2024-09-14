import { Container, Divider } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components';

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Divider mb="xs" />
          <Outlet />
        </Container>
      </main>
    </>
  );
};
