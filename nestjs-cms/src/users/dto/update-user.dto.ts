import { Role } from '../users.model';

export class UpdateUserDto {
  name: string;
  role?: Role;
}
