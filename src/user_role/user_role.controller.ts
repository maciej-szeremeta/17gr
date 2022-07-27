import { Controller, Get, Inject, Param, Post, } from '@nestjs/common';
import { CreateUserRoleRes, GetListOfUserRolesRes, UserRoleRes, } from '../interface/user-role';
import { UserRoleService, } from './user_role.service';

@Controller('/user-role')
export class UserRoleController {
  constructor(@Inject(UserRoleService) private userRoleService: UserRoleService) {}

  // * POST - Create a New user_role
  // @ Admin
  @Post('/')
  createNewUserRole(): Promise<CreateUserRoleRes> {
    return this.userRoleService.createUserRole();
  }

  // * GET One User Role
  // @ Admin
  @Get('/:id')
  getOneUserRole(@Param('id')id: string): Promise<UserRoleRes> { 
    return this.userRoleService.getOneUserRole(id);
  }

  // * GET All User Role
  // @ Admin
  @Get('/')
  getListUserRole(): Promise<GetListOfUserRolesRes> { 
    return this.userRoleService.getAllUserRoles();
  }
}
