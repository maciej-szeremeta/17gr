import { StudentUrl, } from 'src/student-url/entities/student-url.entity';
import { User, } from '../user/entities/user.entity';

export type StudentEntity = {
   id?: string;
   email?:string
   courseCompletion: number;
   courseEngagement: number;
   projectDegree: number;
   teamProjectDegree: number;
   bonusProjectUrls?: StudentUrl[];
   user?:User
} | {
   courseCompletion: number;
   courseEngagement: number;
   projectDegree: number;
   teamProjectDegree: number;
   bonusProjectUrls?: StudentUrl[];
   user?:User
}

export type GetOneStudentRes = StudentEntity | null;

export type StudentImportRes = StudentEntity[];