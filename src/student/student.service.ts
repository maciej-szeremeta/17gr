import { Injectable, } from '@nestjs/common';
import { StudentEntity, } from '../interface/student';
import { User, } from '../user/entities/user.entity';
import { CreateStudentDto, } from './dto/create-student.dto';
import { Student, } from './entities/student.entity';

@Injectable()
export class StudentService {
  async addStudent(student: CreateStudentDto, userRole:User): Promise<StudentEntity> {
    
    const registerStudent = new Student();
    registerStudent.courseCompletion = student.courseCompletion;
    registerStudent.courseEngagement = student.courseEngagement;
    registerStudent.projectDegree = student.projectDegree;
    registerStudent.teamProjectDegree = student.teamProjectDegree;
    registerStudent.createdBy = userRole.id;
    registerStudent.user = await User.findOneBy({ id: student.user, });
    await registerStudent.save();
    return registerStudent;
  }
}
