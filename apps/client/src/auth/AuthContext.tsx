import { useDidUpdate, useLocalStorage } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  authControllerMe,
  client,
  ResponseAuthorizedUserDTO,
  ResponseLoggedInDTO,
} from '@/api';
import {
  authControllerLoginMutation,
  authControllerSignupMutation,
} from '@/api/@tanstack/react-query.gen';

import { AUTH_LOCAL_STORAGE_NAME } from './auth.constants';
import { IAuthContext } from './auth.interfaces';
import { AuthStatus } from './auth.types';

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [status, setStatus] = useState<AuthStatus>('unloaded');
  const [user, setUser] = useState<ResponseAuthorizedUserDTO>();
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useLocalStorage({
    key: AUTH_LOCAL_STORAGE_NAME,
    defaultValue: '',
  });

  const loginMutation = useMutation(authControllerLoginMutation());
  const signupMutation = useMutation(authControllerSignupMutation());

  const setStates = ({ accessToken, user }: Partial<ResponseLoggedInDTO>) => {
    if (accessToken) {
      setAccessToken(accessToken);
    }

    if (user) {
      setUser(user);
    }
  };

  const onFinally = useCallback(() => {
    setLoading(false);

    setStatus(() => {
      if (user) {
        return 'authenticated';
      } else {
        return 'unauthenticated';
      }
    });
  }, [user]);

  const value: IAuthContext = {
    status,
    user,
    loading,
    accessToken,
    login(body) {
      setLoading(true);

      return loginMutation
        .mutateAsync({ body })
        .then(setStates)
        .finally(onFinally);
    },
    signup(body) {
      setLoading(true);

      return signupMutation
        .mutateAsync({ body })
        .then(setStates)
        .finally(onFinally);
    },
    logout() {
      setAccessToken('');
      setUser(undefined);
    },
  };

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    client.instance.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return config;
    });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken || user) {
      setStatus('unauthenticated');

      return;
    }

    setLoading(true);

    authControllerMe()
      .then(({ data: user }) => {
        if (!user) {
          return;
        }

        setUser(user);
      })
      .finally(onFinally);
  }, [accessToken, onFinally, user]);

  useDidUpdate(() => {
    if (!user) {
      setStatus('unauthenticated');
    } else {
      setStatus('authenticated');
    }
  }, [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
