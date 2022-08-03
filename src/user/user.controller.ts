import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe, } from '@nestjs/common';
import { AuthGuard, } from '@nestjs/passport';
import { UserRoleEnum, } from '../interface/user-role';
import { Roles, } from '../decorators/roles.decorator';
import { UserRegisterRes, } from '../interface/user';
import { RegisterAdminDto, } from './dto/register-admin.dto';
import { RegisterUserDto as RegisterHrDto, } from './dto/register-hr.dto';
import { UserService, } from './user.service';
import { RolesGuard, } from '../guards/roles.guard';
import { UserObj, } from '../decorators/user-obj.decorator';
import { User, } from './entities/user.entity';

@Controller('/user')
export class UserController {

  constructor(private readonly userService: UserService) { }
   
  // !!! Delete After Create Admin Action!!!
    @Post('/register-admin')
  async createAdmin(
    @Body() createUser: RegisterAdminDto
  ): Promise<UserRegisterRes> {
    return this.userService.registerAdmin(createUser);
  }

  @Post('/register-hr')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
    async createHr(
      @Body() createUser: RegisterHrDto,
      @UserObj() user: User
    ): Promise<UserRegisterRes> {
      return this.userService.registerHr(createUser, user);
    }
}
