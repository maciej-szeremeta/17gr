import { CreateUserRoleRes, } from '../interface/user-role';
import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { GetListOfUserRolesRes, UserRoleEntity, } from '../interface/user-role';
import { UserRole, } from './entities/user-role.entity';
import { createUserRoleDto, } from './dto/create-user-role.dto';
import { config, } from '../app.utils';

@Injectable()
export class UserRoleService {

  async createUserRole(user: createUserRoleDto): Promise<CreateUserRoleRes> {
    const { type, } = user;

    if (await this.isRoleTaken(type)) { throw new ConflictException(config.messageValid.unique[ config.languages ]); }
    
    const newUserRole = new UserRole();
    newUserRole.type = type;

    await newUserRole.save();
    return newUserRole;
  }
   
  async getOneUserRole(type: string): Promise<UserRoleEntity> {
    return await UserRole.findOneByOrFail({
      type,
    });
  }

  async getAllUserRoles(): Promise<GetListOfUserRolesRes> {
    return await UserRole.find();
  }

  async isRoleTaken(type: string): Promise<boolean> { 
    return (await this.getAllUserRoles()).some(role => 
      role.type === type);
  }
}