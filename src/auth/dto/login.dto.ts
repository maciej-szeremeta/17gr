import { IsNotEmpty, } from 'class-validator';
import { config, } from '../../app.utils';

export class LoginUserDto {
  @IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ]('email'), })
    email: string;

@IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ]('pwd'), })
  pwd: string;
}