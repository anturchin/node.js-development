import { Role } from '../../models/user/types';

export interface ICreateUserDto {
    email: string;
    username: string;
    password: string;
    role?: Role;
}
