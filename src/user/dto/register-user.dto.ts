import { IsNotEmpty, Length, IsString, IsEmail, Matches, IsEnum, } from 'class-validator';
import { UserRoleEnum, } from '../../interface/user-role';
import { config, } from '../../app.utils';

export class RegisterUserDto{
   @IsNotEmpty({ message: config.messageValid.notEmpty[ config.languages ], })
   @IsString({ message: config.messageValid.string[ config.languages ], })
   @IsEmail({ message: config.messageValid.email[ config.languages ], })
     email: string;

   @IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ], })
   @Length(6, 24, { message: config.messageValid.length[ config.languages ], })
   @IsString({ message: config.messageValid.string[ config.languages ], })
   @Matches(config.validation.password, { message:config.messageValid.password[ config.languages ], })
     pwd: string;

  @IsNotEmpty({ message: config.messageValid.notEmpty[ config.languages ], })
  @Length(2, 7, { message: config.messageValid.length[ config.languages ], })
  @IsString({ message: config.messageValid.string[ config.languages ], })
  @IsEnum(UserRoleEnum, { message: config.messageValid.enum[ config.languages ], })
    type: UserRoleEnum;
}