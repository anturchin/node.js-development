import { Role } from '../users.interface';

export class CreateUserDto {
  name: string;
  role: Role;
}
