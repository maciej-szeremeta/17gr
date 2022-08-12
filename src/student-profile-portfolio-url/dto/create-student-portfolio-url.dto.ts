import { IsArray, IsNotEmpty, IsString, } from 'class-validator';
import { config, } from '../../app.utils';

export class createStudentPortfolioUrlDto{
   @IsArray()
     urls: string[];

  @IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ]('student'), })
  @IsString({ message: config.messageValid.string[ config.languages ]( 'student'), })
    studentPortfolioId: string;
}