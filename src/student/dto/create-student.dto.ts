import { IsNumber, Min, Max, IsOptional, IsNotEmpty, IsString, IsArray, } from 'class-validator';
import { config, } from '../../app.utils';

export class CreateStudentDto{
  @IsOptional()
  @IsNumber(undefined, { message: config.messageValid.number[ config.languages ]('courseCompletion'), })
  @Min(0, { message: config.messageValid.numberMin[ config.languages ](0, 'courseCompletion'), })
  @Max(5, { message: config.messageValid.numberMax[ config.languages ](5, 'courseCompletion'), })
    courseCompletion: number;

  @IsOptional()
  @IsNumber(undefined, { message: config.messageValid.number[ config.languages ]('courseEngagement'), })
  @Min(0, { message: config.messageValid.numberMin[ config.languages ](0, 'courseEngagement'), })
  @Max(5, { message: config.messageValid.numberMax[ config.languages ](5, 'courseEngagement'), })
    courseEngagement: number;

  @IsOptional()
  @IsNumber(undefined, { message: config.messageValid.number[ config.languages ]('projectDegree'), })
  @Min(0, { message: config.messageValid.numberMin[ config.languages ](0, 'projectDegree'), })
  @Max(5, { message: config.messageValid.numberMax[ config.languages ](5, 'projectDegree'), })
    projectDegree: number;

  @IsOptional()
  @IsNumber(undefined, { message: config.messageValid.number[ config.languages ]('teamProjectDegree'), })
  @Min(0, { message: config.messageValid.numberMin[ config.languages ](0, 'teamProjectDegree'), })
  @Max(5, { message: config.messageValid.numberMax[ config.languages ](5, 'teamProjectDegree'), })
    teamProjectDegree: number;
  
  @IsOptional()
  @IsArray()
    bonusProjectUrls:string[];

  @IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ]('user'), })
  @IsString({ message: config.messageValid.string[ config.languages ]( 'user'), })
    user: string;
}