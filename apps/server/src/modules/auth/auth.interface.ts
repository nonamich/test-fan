export interface IAuthorizedUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface IJwtPayload {
  id: number;
}
