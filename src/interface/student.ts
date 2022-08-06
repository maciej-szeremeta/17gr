import { User, } from '../user/entities/user.entity';

export type StudentEntity = {
   id?: string;
   email?:string
   courseCompletion: number;
   courseEngagement: number;
   projectDegree: number;
   teamProjectDegree: number;
   user?:User
} | {
   courseCompletion: number;
   courseEngagement: number;
   projectDegree: number;
   teamProjectDegree: number;
   user?:User
}

export type GetOneStudentRes = StudentEntity | null;

export type StudentImportRes = StudentEntity[];