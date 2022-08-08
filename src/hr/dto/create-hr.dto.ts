import { IsNotEmpty, IsString, IsNumber, Min, Max, IsOptional, } from 'class-validator';
import { config, } from '../../app.utils';

export class CreateHrDto{

  @IsNotEmpty({ message: config.messageValid.notEmpty[ config.languages ]('fullName'), })
  @IsString({ message: config.messageValid.string[ config.languages ]( 'fullName'), })
    fullName: string;

  @IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ]('company'), })
  @IsString({ message: config.messageValid.string[ config.languages ]( 'company'), })
    company: string;

  @IsOptional()
  @IsNumber(undefined, { message: config.messageValid.number[ config.languages ]('maxReservedStudents'), })
  @Min(1, { message: config.messageValid.numberMin[ config.languages ](1, 'maxReservedStudents'), })
  @Max(999, { message: config.messageValid.numberMax[ config.languages ](999, 'maxReservedStudents'), })
    maxReservedStudents: number;

  @IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ]('user'), })
  @IsString({ message: config.messageValid.string[ config.languages ]( 'user'), })
    user: string;
}