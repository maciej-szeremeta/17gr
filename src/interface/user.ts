export interface UserEntity {
   id: string;
   email: string;
   pwdHash: string;
   currentTokenId: string | null
   createdBy: string
}

export type UserRegisterRes = Pick<UserEntity, 'id' | 'email'>;

export type GetOneUserRes = UserEntity | null;

export type GetAllUsersRes = UserEntity[];