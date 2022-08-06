import { IsNotEmpty, IsString, } from 'class-validator';
import { config, } from '../../app.utils';

export class createStudentUrlDto{
   @IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ]('url'), })
   @IsString({ message:config.messageValid.string[ config.languages ], })
     url: string;
}