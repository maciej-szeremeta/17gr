import { Body, Controller, Get, Inject, Param, Post, UsePipes, ValidationPipe, } from '@nestjs/common';
import { CreateUserRoleRes, GetListOfUserRolesRes, UserRoleRes, } from '../interface/user_role';
import { createUserRoleDto, } from './dto/create-user_role.dto';
import { UserRoleService, } from './user_role.service';

@Controller('/user-role')
export class UserRoleController {
  constructor(@Inject(UserRoleService) private userRoleService: UserRoleService) {}

  // * POST - Create a New user_role
  // @ Admin
  @Post('/')
  @UsePipes(ValidationPipe)
  createNewUserRole(@Body()user:createUserRoleDto): Promise<CreateUserRoleRes> {
    return this.userRoleService.createUserRole(user);
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
