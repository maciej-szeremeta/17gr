import { CreateUserRoleRes, } from './../interface/user-role';
import { Injectable, } from '@nestjs/common';
import { GetListOfUserRolesRes, UserRoleItem, } from '../interface/user-role';
import { UserRole, } from './user_role.entity';

@Injectable()
export class UserRoleService {

  async createUserRole(user:CreateUserRoleRes): Promise<UserRoleItem> {
    const newUserRole = new UserRole();
    newUserRole.type = user.type;

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

  async hasUserRole(type: string): Promise<boolean> {
    return (await this.getAllUserRoles()).some(role => 
      role.type === type);
  }
}