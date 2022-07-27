import { Controller, Get, Param, Post, } from '@nestjs/common';

@Controller('/user-role')
export class UserRoleController {

  // * POST - Create a New user_role
  // @ Admin
  @Post('/')
  createUserRole():string {
    return 'create user role';
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
