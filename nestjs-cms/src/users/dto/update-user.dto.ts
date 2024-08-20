import { Role } from '../users.interface';

export class UpdateUserDto {
  name: string;
  role?: Role;
}
