import { Body, Controller, Post, } from '@nestjs/common';
import { UserRegisterRes, } from '../interface/user';
import { RegisterAdminDto, } from './dto/register-admin.dto';
import { RegisterUserDto, } from './dto/register-user.dto';
import { UserService, } from './user.service';

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

  @Post('/register')
    async createUser(
  @Body() createUser: RegisterUserDto
    ): Promise<UserRegisterRes> {
      return this.userService.register(createUser);
    }
}
