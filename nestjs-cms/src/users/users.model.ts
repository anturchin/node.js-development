export const enum Role {
  User = 'user',
  Admin = 'admin',
}

export interface UserModel {
  id: string;
  name: string;
  isActive: boolean;
  role: Role;
}
