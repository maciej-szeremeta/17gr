import { IsNotEmpty, IsString, Length, Matches, } from 'class-validator';
import { config, } from '../../app.utils';

export class PasswordUserDto {
@IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ]('pwd'), })
@Length(6, 24, { message: config.messageValid.length[ config.languages ](6, 24, 'Pwd'), })
@IsString({ message: config.messageValid.string[ config.languages ]( 'pwd'), })
@Matches(config.validation.password, { message:config.messageValid.password[ config.languages ], })
  pwd: string;
}