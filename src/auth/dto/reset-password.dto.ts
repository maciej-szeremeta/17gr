import { IsEmail, IsNotEmpty, IsString, } from 'class-validator';
import { config, } from '../../app.utils';

export class ResetPasswordDto {
   @IsNotEmpty({ message: config.messageValid.notEmpty[ config.languages ]('email'), })
   @IsString({ message: config.messageValid.string[ config.languages ]( 'email'), })
   @IsEmail({ message: config.messageValid.email[ config.languages ], })
     email: string;
}