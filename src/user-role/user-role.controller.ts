import { Body, Controller, Get, Inject, Param, Post, UseGuards, UsePipes, ValidationPipe, } from '@nestjs/common';
import { AuthGuard, } from '@nestjs/passport';
import { UserObj, } from '../decorators/user-obj.decorator';
import { Roles, } from '../decorators/roles.decorator';
import { RolesGuard, } from '../guards/roles.guard';
import { CreateUserRoleRes, GetListOfUserRolesRes, UserRoleEnum, UserRoleRes, } from '../interface/user-role';
import { createUserRoleDto, } from './dto/create-user-role.dto';
import { UserRoleService, } from './user-role.service';
import { User, } from '../user/entities/user.entity';

@Controller('/user-role')
export class UserRoleController {
  constructor(@Inject(UserRoleService) private userRoleService: UserRoleService) {}

  // * POST - Create a New user_role
  // @ Admin
  @Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  createNewUserRole(
    @Body() newUser: createUserRoleDto,
    @UserObj() user: User): Promise<CreateUserRoleRes> {
    return this.userRoleService.createUserRole(newUser, user);
  }

  // * GET One User Role
  // @ Admin
  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  getOneUserRole(@Param('id')id: string): Promise<UserRoleRes> { 
    return this.userRoleService.getOneUserRole(id);
  }

  // * GET All User Role
  // @ Admin
  @Get('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  getListUserRole(): Promise<GetListOfUserRolesRes> { 
    return this.userRoleService.getAllUserRoles();
  }
}
