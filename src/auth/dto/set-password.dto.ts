import { IsNotEmpty, IsString, Length, Matches, } from 'class-validator';
import { config, } from '../../app.utils';

export class PasswordUserDto {
@IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ]('email'), })
@Length(6, 24, { message: config.messageValid.length[ config.languages ], })
@IsString({ message: config.messageValid.string[ config.languages ], })
@Matches(config.validation.password, { message:config.messageValid.password[ config.languages ], })
  pwd: string;
}