import { Student, } from '../student/entities/student.entity';

export type StudentUrlEntity = {
   id?: string;
   url: string;
   createdBy: string;
   studentId?:Student
}

export type StudentImportRes = StudentUrlEntity[] | null;