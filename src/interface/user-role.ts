export enum UserRoleEnum {
  ADMIN = 'admin',
  STUDENT = 'student',
  HR = 'hr'
}

export interface UserRoleItem{
  type:UserRoleEnum
}