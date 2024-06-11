import { ICreateUserDto } from '../../dto/userDto/CreateUserDto';
import { IUserDocument, Role } from '../../models/user/types';
import User from '../../models/user/User';

export class UserService {
    public async findByIdAndDelete(userId: string): Promise<IUserDocument | null> {
        const user = await User.findByIdAndDelete(userId).exec();
        return user;
    }

    public async createUser(newUser: ICreateUserDto): Promise<IUserDocument> {
        const user = new User(newUser);
        await user.save();
        return user;
    }

    public async findUserById(userId: string): Promise<IUserDocument | null> {
        const user = await User.findById(userId).exec();
        return user;
    }

    public async findUserByEmail(email: string): Promise<IUserDocument | null> {
        const user = await User.findOne({ email }).exec();
        return user;
    }

    public async findUsers(): Promise<IUserDocument[]> {
        const users = await User.find().exec();
        return users;
    }

    public async updateUsersRole(role: Role, userId: string): Promise<boolean> {
        const user = await this.findUserById(userId);
        if (user) {
            user.role = role as Role;
            await user.save();
            return true;
        }
        return false;
    }

    public async findUser({
        email,
        password,
    }: Pick<IUserDocument, 'email' | 'password'>): Promise<IUserDocument | null> {
        const user = await User.findOne({ email, password }).exec();
        return user;
    }
}
