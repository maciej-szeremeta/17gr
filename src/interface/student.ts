import { StudentUrl, } from 'src/student-url/entities/student-url.entity';
import { Student, } from '../student/entities/student.entity';
import { User, } from '../user/entities/user.entity';

export type StudentEntity = {
   id: string;
   courseCompletion: number;
   courseEngagement: number;
   projectDegree: number;
   teamProjectDegree: number;
   bonusProjectUrls?: StudentUrl[];
   user?: User;
   createdBy: string;
   updatedAt: Date;
   createdAt: Date;
}

export type GetOneStudentRes = StudentEntity | null;

export type GetAllStudentRes = StudentEntity[] | null;

export type StudentImportRes = Student;