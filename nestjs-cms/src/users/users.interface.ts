export const enum Role {
  User = 'user',
  Admin = 'admin',
}

export interface User {
  id: string;
  name: string;
  isActive: boolean;
  role: Role;
}

export interface ErrorUser {
  message: string;
}
