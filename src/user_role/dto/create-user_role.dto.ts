import { UserRoleEnum, } from '../../interface/user_role';
import { IsNotEmpty, Length, IsEnum, IsString, } from 'class-validator';
import { config, } from '../../app.utils';

export class createUserRoleDto{
   @IsNotEmpty({ message:config.message.notEmpty, })
   @Length(2, 7, { message: config.message.length, })
   @IsString({ message:config.message.string, })
   @IsEnum(UserRoleEnum, { message: config.message.enum, groups: [ 'admin', 'student', 'hr', ], each: true, always: true, })
     type: UserRoleEnum;
}