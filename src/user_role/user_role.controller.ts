import { Body, Controller, Get, Param, Post, } from '@nestjs/common';
import { UserRoleDto, } from './dto/user_role.dto';

@Controller('/user-role')
export class UserRoleController {

  // * POST - Create a New user_role
  // @ Admin
  @Post('/')
  createUserRole(@Body()createUserRole:UserRoleDto):string {
    return `create user role ${createUserRole.type}`;
  }

  // * GET One User Role
  // @ Admin
  @Get('/:id')
  getOneUserRole(@Param('id')id: string): string { 
    return `get one user role id ${id}`;
  }

  // * GET All User Role
  // @ Admin
  @Get('/')
  getListUserRole(): string { 
    return 'get all user role';
  }
}
