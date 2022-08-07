import { User, } from '../user/entities/user.entity';

export interface UserEntity {
   id: string;
   email: string;
   pwdHash: string;
   currentTokenId: string | null
   createdBy: string
}

export type GetOneUserRes = UserEntity | null;

export type GetAllUsersRes = UserEntity[];

export type UserRegisterRes = Pick<User, 'id' | 'email'>;