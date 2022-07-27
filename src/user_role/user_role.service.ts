import { Injectable, } from '@nestjs/common';
import { GetListOfUserRolesRes, UserRoleEnum, UserRoleItem, } from '../interface/user-role';
import { UserRole, } from './user_role.entity';

@Injectable()
export class UserRoleService {

  async createUserRole(): Promise<UserRoleItem> {
    const newUserRole = new UserRole();
    newUserRole.type = UserRoleEnum.STUDENT;

    await newUserRole.save();
    return newUserRole;
  }
   
  async getOneUserRole(id: string): Promise<UserRoleItem> {
    return await UserRole.findOneByOrFail({
      id,
    });
  }

  async getAllUserRoles(): Promise<GetListOfUserRolesRes> {
    return await UserRole.find();
  }
}