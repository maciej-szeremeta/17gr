export enum UserRoleEnum {
  ADMIN = 'admin',
  STUDENT = 'student',
  HR = 'hr'
};

export interface UserRoleItem{
  type:UserRoleEnum
};

export type CreateUserRoleRes = UserRoleItem|string;

export type UserRoleRes = UserRoleItem;

export type GetListOfUserRolesRes = UserRoleItem[]