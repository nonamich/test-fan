import {
  Avatar,
  Card,
  Group,
  Loader,
  Pagination,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { IconAt, IconPhoneCall } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';

import { ResponseUserDTO } from '@/api';
import {
  usersControllerCountOptions,
  usersControllerFindAllOptions,
} from '@/api/@tanstack/react-query.gen';

const LIMIT = 3;

export const Users = () => {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(
    usersControllerFindAllOptions({
      query: {
        page,
        limit: LIMIT,
      },
    }),
  );
  const { data: countDTO } = useQuery(usersControllerCountOptions());

  useEffect(() => {
    if (!countDTO) {
      return;
    }

    setCount(countDTO.count);
  }, [countDTO]);
  const total = Math.ceil(count / LIMIT);

  return (
    <>
      {isLoading && <Loader color="gray" />}
      <SimpleGrid cols={3} mb="sm">
        {data &&
          data.users.map((user) => {
            return <User {...user} key={user.email} />;
          })}
      </SimpleGrid>
      {count && <Pagination total={total} value={page} onChange={setPage} />}
    </>
  );
};

const User: FC<ResponseUserDTO> = (user: ResponseUserDTO) => {
  return (
    <Card withBorder padding="lg" radius="md">
      <Avatar name={user.name} size={80} radius={80} mx="auto" mb="sm" />
      <Group justify="center" wrap="nowrap" gap={10} mt={3}>
        <IconAt stroke={1.5} size="1rem" />
        <Text fz="xs" c="dimmed">
          {user.email}
        </Text>
      </Group>
      <Group justify="center" wrap="nowrap" gap={10} mt={5}>
        <IconPhoneCall stroke={1.5} size="1rem" />
        <Text fz="xs" c="dimmed">
          {user.phone}
        </Text>
      </Group>
    </Card>
  );
};
