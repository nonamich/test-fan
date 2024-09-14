import { Group, Avatar, Text } from '@mantine/core';
import { IconAt, IconPhoneCall } from '@tabler/icons-react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/auth/AuthContext';

export const UserPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Group wrap="nowrap">
      <Avatar size={94} name={user.name} />
      <div>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          Me
        </Text>
        <Text fz="lg" fw={500}>
          {user.name}
        </Text>
        <Group wrap="nowrap" gap={10} mt={3}>
          <IconAt stroke={1.5} size="1rem" />
          <Text fz="xs" c="dimmed">
            {user.email}
          </Text>
        </Group>
        <Group wrap="nowrap" gap={10} mt={5}>
          <IconPhoneCall stroke={1.5} size="1rem" />
          <Text fz="xs" c="dimmed">
            {user.phone}
          </Text>
        </Group>
      </div>
    </Group>
  );
};
