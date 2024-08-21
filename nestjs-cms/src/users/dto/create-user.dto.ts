import { Role } from '../users.model';

export class CreateUserDto {
  name: string;
  role: Role;
}
