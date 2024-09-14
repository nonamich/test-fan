import {
  RequestLoginDTO,
  RequestSignupDTO,
  ResponseAuthorizedUserDTO,
} from '@/api';

import { AuthStatus } from './auth.types';

export interface IAuthContext {
  status: AuthStatus;
  accessToken: string | null;
  user?: ResponseAuthorizedUserDTO;
  loading: boolean;
  logout: () => void;
  login: (body: RequestLoginDTO) => Promise<void>;
  signup: (body: RequestSignupDTO) => Promise<void>;
}
