import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe, } from '@nestjs/common';
import { join, } from 'path';
import { FileFieldsInterceptor, } from '@nestjs/platform-express';
import { AuthGuard, } from '@nestjs/passport';
import { UserRoleEnum, } from '../interface/user-role';
import { Roles, } from '../decorators/roles.decorator';
import { UserRegisterRes, } from '../interface/user';
import { RegisterAdminDto, } from './dto/register-admin.dto';
import { RegisterHrDto as RegisterHrDto, } from './dto/register-hr.dto';
import { UserService, } from './user.service';
import { RolesGuard, } from '../guards/roles.guard';
import { UserObj, } from '../decorators/user-obj.decorator';
import { User, } from './entities/user.entity';
import { HrRegisterRes, } from '../interface/hr';
import { StudentImportRes, } from '../interface/student';
import { MulterDiskUploadFiles, } from '../interface/file';
import { multerStorage, storageDir, } from '../utils/storage';

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
      @Body() createHr: RegisterHrDto,
      @UserObj() user: User
    ): Promise<HrRegisterRes> {
      return this.userService.registerHr(createHr, user);
    }

  @Post('/import-student')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @UseInterceptors(FileFieldsInterceptor(
    [ { name: 'csv', maxCount: 1, }, ], { storage: multerStorage(join(storageDir(), 'csv')), }))
  async createStudent(
    @UploadedFiles() files: MulterDiskUploadFiles,
    @UserObj() user: User
  ): Promise<StudentImportRes> {
    return this.userService.importStudent( user, files);
  }
}
