import { UserRoleEnum, } from '../../interface/user-role';
import { IsNotEmpty, Length, IsEnum, } from 'class-validator';
import { config, } from '../../app.utils';

export class UserRoleDto{
   @IsNotEmpty({ message:config.message.notEmpty, })
   @Length(2, 7, { message: config.message.length, })
   @IsEnum(UserRoleEnum)
     type:UserRoleEnum;
}