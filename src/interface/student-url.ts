import { Student, } from '../student/entities/student.entity';

export interface StudentUrlEntity{
   url: string;
   student?:Student
}