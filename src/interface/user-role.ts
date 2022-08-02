export enum UserRoleEnum {
  ADMIN = 'admin',
  STUDENT = 'student',
  HR = 'hr'
};

export interface UserRoleEntity{
  id:string
  type: string
};

export type CreateUserRoleRes = UserRoleEntity|string;

export type UserRoleRes = UserRoleEntity;

export type GetListOfUserRolesRes = UserRoleEntity[];