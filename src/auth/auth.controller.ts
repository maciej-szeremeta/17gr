import { Controller, Post, Body, Res, Get, UseGuards, } from '@nestjs/common';
import { AuthService, } from './auth.service';
import { LoginUserDto, } from './dto/login.dto';
import { Response, }from 'express';
import { UserObj, } from '../decorators/user-obj.decorator';
import { User, } from '../user/entities/user.entity';
import { AuthGuard, } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginUser(
    @Body() req: LoginUserDto,
    @Res() res: Response): Promise<any> {
    return this.authService.login(req, res);
  }

  @Get('/logout')
    @UseGuards(AuthGuard('jwt'))
  async logoutUser(
    @UserObj() user: User,
    @Res() res: Response):Promise<any> {
    return this.authService.logout(user, res);
  }
}