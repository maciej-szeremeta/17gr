import { StudentProfileService, } from './student-profile.service';
import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe, } from '@nestjs/common';
import { AuthGuard, } from '@nestjs/passport';
import { UserRoleEnum, } from '../interface/user-role';
import { Roles, } from '../decorators/roles.decorator';
import { RolesGuard, } from '../guards/roles.guard';
import { CreateStudentProfileDto, } from './dto/create-student-profile.dto';
import { UserObj, } from '../decorators/user-obj.decorator';
import { User, } from '../user/entities/user.entity';
import { CreateUserProfileRes, } from '../interface/student-profile';

@Controller('/student-profile')
export class StudentProfileController {
  constructor(private readonly studentProfileService: StudentProfileService) { }

@Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.STUDENT)
  async createHr(
      @Body() createStudentProfile: CreateStudentProfileDto,
      @UserObj() user: User
  )/*: Promise<CreateUserProfileRes>*/ {
    return this.studentProfileService.createStudentProfile(createStudentProfile, user);
  }
}
