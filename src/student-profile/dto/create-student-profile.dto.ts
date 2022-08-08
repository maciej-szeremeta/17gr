import { ArrayHasLinks, } from './validators/arrayHasLinks';
import { IsNumber, Min, Max, IsOptional, IsNotEmpty, IsString, IsArray, IsPhoneNumber, Length, IsEnum, IsBoolean, ArrayMaxSize, Validate, } from 'class-validator';
import { PrimaryGeneratedColumn, } from 'typeorm';
import { config, } from '../../app.utils';
import { ExpectedContractType, ExpectedTypeWork, } from '../../interface/student-profile';

export class CreateStudentProfileDto {

   @PrimaryGeneratedColumn('uuid')
     id: string;

   @IsOptional()
   @IsString({ message: config.messageValid.string[ config.languages ]( 'tel'), })

   // @IsPhoneNumber('PL', { message: config.messageValid.phoneNumber[ config.languages ]('Telefon'), })
   @IsPhoneNumber(undefined, { message: config.messageValid.phoneNumber[ config.languages ]('Telefon'), })
     tel: string | null;

   @IsNotEmpty({ message: config.messageValid.notEmpty[ config.languages ]('firstName'), })
   @IsString({ message: config.messageValid.string[ config.languages ]( 'firstName'), })
   @Length(1, 57, { message: config.messageValid.length[ config.languages ](1, 57, 'FirstName'), })
     firstName: string;
   
   @IsNotEmpty({ message: config.messageValid.notEmpty[ config.languages ]('lastName'), })
   @IsString({ message: config.messageValid.string[ config.languages ]( 'lastName'), })
   @Length(1, 255, { message: config.messageValid.length[ config.languages ](1, 255, 'lastName'), })
     lastName: string;
   
   @IsNotEmpty({ message: config.messageValid.notEmpty[ config.languages ]('githubUsername'), })
   @IsString({ message: config.messageValid.string[ config.languages ]( 'githubUsername'), })
     githubUsername: string;
     
  @IsOptional()
  @IsArray({ message: config.messageValid.array[ config.languages ], })
  @ArrayMaxSize(10)
  @Validate(ArrayHasLinks, { message:'Tablica zawiera elementy które nie są linkami.', })
    portfolioUrls: string[];

   @IsOptional()
   @IsArray({ message: config.messageValid.array[ config.languages ], })
   @ArrayMaxSize(10)
   @Validate(ArrayHasLinks, { message:'Tablica zawiera elementy które nie są linkami.', })
     projectUrls:string[];

   @IsOptional()
   @IsString({ message: config.messageValid.string[ config.languages ]( 'bio'), })
     bio: string;
   
   @IsOptional()
   @IsString({ message: config.messageValid.string[ config.languages ]( 'expectedTypeWork'), })
   @IsEnum(ExpectedTypeWork, { message: config.messageValid.enum[ config.languages ], })
     expectedTypeWork: string;
   
   @IsOptional()
   @IsString({ message: config.messageValid.string[ config.languages ]( 'targetWorkCity'), })
     targetWorkCity: string;
   
   @IsOptional()
   @IsString({ message: config.messageValid.string[ config.languages ]( 'expectedContractType'), })
   @IsEnum(ExpectedContractType, { message: config.messageValid.enum[ config.languages ], })
     expectedContractType: string;

  @IsOptional()
  @IsNumber(undefined, { message: config.messageValid.number[ config.languages ]('ExpectedSalary'), })
  @Min(0, { message: config.messageValid.numberMin[ config.languages ](0, 'ExpectedSalary'), })
  @Max(9, { message: config.messageValid.numberMax[ config.languages ](9, 'ExpectedSalary'), })
    expectedSalary: number;
   
  @IsOptional()
  @IsBoolean()
    canTakeApprenticeship: number | boolean;

  @IsOptional()
  @IsNumber(undefined, { message: config.messageValid.number[ config.languages ]('MonthsOfCommercialExp'), })
  @Min(0, { message: config.messageValid.numberMin[ config.languages ](0, 'MonthsOfCommercialExp'), })
  @Max(9, { message: config.messageValid.numberMax[ config.languages ](5, 'MonthsOfCommercialExp'), })
    monthsOfCommercialExp: number;

  @IsOptional()
  @IsString({ message: config.messageValid.string[ config.languages ]( 'education'), })
    education: string | null;

  @IsOptional()
  @IsString({ message: config.messageValid.string[ config.languages ]( 'workExperience'), })
    workExperience: string | null;
   
  @IsOptional()
  @IsString({ message: config.messageValid.string[ config.languages ]( 'courses'), })
    courses: string | null;
}