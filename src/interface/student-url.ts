import { StudentUrl, } from '../student-url/entities/student-url.entity';
import { Student, } from '../student/entities/student.entity';

export type StudentUrlEntity = {
   id: string;
   url: string;
   createdBy: Date;
   createdAt: Date;
   updatedAt: string;
   studentId?:Student
}

export type StudentUrlImportRes = StudentUrl[];