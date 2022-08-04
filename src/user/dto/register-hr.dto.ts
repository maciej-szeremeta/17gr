import { IsNotEmpty, IsString, IsEmail, IsNumber, Min, Max, IsOptional, } from 'class-validator';
import { config, } from '../../app.utils';

export class RegisterUserDto{
  @IsNotEmpty({ message: config.messageValid.notEmpty[ config.languages ], })
  @IsString({ message: config.messageValid.string[ config.languages ], })
  @IsEmail({ message: config.messageValid.email[ config.languages ], })
    email: string;

  @IsNotEmpty({ message: config.messageValid.notEmpty[ config.languages ], })
  @IsString({ message: config.messageValid.string[ config.languages ], })
    fullName: string;

  @IsNotEmpty({ message:config.messageValid.notEmpty[ config.languages ], })
  @IsString({ message: config.messageValid.string[ config.languages ], })
    company: string;

  @IsOptional()
  @IsNumber(undefined, { message: config.messageValid.number[ config.languages ]('maxReservedStudents'), })
  @Min(1, { message: config.messageValid.numberMin[ config.languages ](1, 'maxReservedStudents'), })
  @Max(999, { message: config.messageValid.numberMax[ config.languages ](999, 'maxReservedStudents'), })
    maxReservedStudents: number;
}