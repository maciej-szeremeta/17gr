import { PasswordUserDto, } from './dto/set-password.dto';
import { Controller, Post, Body, Res, Get, UseGuards, Param, UsePipes, ValidationPipe, } from '@nestjs/common';
import { AuthService, } from './auth.service';
import { LoginUserDto, } from './dto/login.dto';
import { Response, }from 'express';
import { UserObj, } from '../decorators/user-obj.decorator';
import { User, } from '../user/entities/user.entity';
import { AuthGuard, } from '@nestjs/passport';
import { Roles, } from '../decorators/roles.decorator';
import { UserRoleEnum, } from '../interface/user-role';
import { RolesGuard, } from '../guards/roles.guard';
import { ResetPasswordDto, } from './dto/reset-password.dto';

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

  @Get('/active/:userId/:tokenId')
  async verify(
    @Param('userId') userId: string,
    @Param('tokenId') tokenId: string,
    @Res() res: Response): Promise<any> {
    return this.authService.active( userId, tokenId, res);
  }

  @Post('/set-password')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(
    UserRoleEnum.ADMIN, UserRoleEnum.HR, UserRoleEnum.STUDENT)
  async password(
    @Body() pwd: PasswordUserDto,
    @UserObj() user: User,
    @Res() res: Response): Promise<any> {
    return this.authService.setPassword( pwd, res, user);
  }

  @Post('/reset-password')
  @UsePipes(ValidationPipe)
  async resetPassword(
    @Body() email: ResetPasswordDto,
    @Res() res: Response
  ): Promise<any> {
    return this.authService.resetPassword( email, res);
  }
}
