import { IsNotEmpty, Length, IsString, IsEmail, Matches, } from 'class-validator';
import { config, } from '../../app.utils';

export class RegisterAdminDto{
   @IsNotEmpty({ message: config.messageValid.notEmpty[ config.languages ]('email'), })
   @IsString({ message: config.messageValid.string[ config.languages ]( 'email'), })
   @IsEmail({ message: config.messageValid.email[ config.languages ], })
     email: string;

   @IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ]('pwd'), })
   @Length(6, 24, { message: config.messageValid.length[ config.languages ](6, 24, 'pwd'), })
   @IsString({ message: config.messageValid.string[ config.languages ]( 'pwd'), })
   @Matches(config.validation.password, { message:config.messageValid.password[ config.languages ], })
     pwd: string;
}