import { IsNotEmpty, } from 'class-validator';
import { config, } from '../../app.utils';

export class LoginUserDto {
  @IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ], })
    email: string;

@IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ], })
  pwd: string;
}