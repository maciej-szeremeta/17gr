import { CreateUserRoleRes, UserRoleEnum, } from './../interface/user-role';
import { Injectable, NotFoundException, } from '@nestjs/common';
import { GetListOfUserRolesRes, UserRoleItem, } from '../interface/user-role';
import { UserRole, } from './user_role.entity';
import { createUserRoleDto, } from './dto/createUser_role.dto';

@Injectable()
export class UserRoleService {

  async createUserRole(user: createUserRoleDto): Promise<CreateUserRoleRes> {
    const { type, } = user;
    console.log(await this.hasRole(type));

    if (await this.hasRole(type)) { throw new NotFoundException('Taka rola już istnieje'); }
    
    const newUserRole = new UserRole();
    newUserRole.type = type;

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

  async hasRole(type: string): Promise<boolean> { 
    return (await this.getAllUserRoles()).some(role => 
      role.type === type);
  }
}