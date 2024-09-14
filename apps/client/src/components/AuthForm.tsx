import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useToggle, upperFirst } from '@mantine/hooks';
import { IconLogin } from '@tabler/icons-react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RequestSignupDTO } from '@/api';
import { useAuth } from '@/auth/AuthContext';

export const AuthForm = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [error, setError] = useState('');
  const { loading, login, signup } = useAuth();
  const [type, toggle] = useToggle(['register', 'login']);
  const form = useForm({
    initialValues: {
      email: '',
      phone: '',
      name: '',
      password: '',
    },
    onValuesChange() {
      setError('');
    },
  });

  let from = location.state?.from?.pathname || '/';

  const onSubmit = async () => {
    const dto = {
      email: form.values.email,
      password: form.values.password,
    };

    const dtoSignup: RequestSignupDTO = {
      ...dto,
      name: form.values.name,
      phone: form.values.phone,
    };

    const promise = type === 'login' ? login(dto) : signup(dtoSignup);

    await promise
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (err instanceof AxiosError && err.response?.data) {
          if (err.status === 400) {
            form.setErrors(err.response.data.fields);

            return;
          }

          setError(err.response.data.message);
        }
      });
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      {error && (
        <Alert mb="md" color="red" title="Login" icon={<IconLogin />}>
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Text size="lg" mb="sm" fw={500}>
          Welcome to {type}
        </Text>
        <Stack>
          {type === 'register' && (
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
          )}
          {type === 'register' && (
            <TextInput
              required
              type="tel"
              label="Phone"
              placeholder="Your phone"
              key={form.key('phone')}
              {...form.getInputProps('phone')}
            />
          )}
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
        </Stack>
        <Group justify="space-between" mt="md">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" loading={loading}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
