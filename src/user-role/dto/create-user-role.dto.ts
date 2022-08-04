import { UserRoleEnum, } from '../../interface/user-role';
import { IsNotEmpty, Length, IsEnum, IsString, } from 'class-validator';
import { config, } from '../../app.utils';

export class createUserRoleDto{
   @IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ]('type'), })
   @Length(2, 7, { message: config.messageValid.length[ config.languages ], })
   @IsString({ message:config.messageValid.string[ config.languages ], })
   @IsEnum(UserRoleEnum, { message: config.messageValid.enum[ config.languages ], })
     type: UserRoleEnum;
}