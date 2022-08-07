import { forwardRef, Inject, Injectable, } from '@nestjs/common';
import { createStudentUrlDto, } from '../student-url/dto/create-student-url.dto';
import { User, } from '../user/entities/user.entity';
import { CreateStudentDto, } from './dto/create-student.dto';
import { Student, } from './entities/student.entity';
import { StudentUrlService, } from '../student-url/student-url.service';
import { StudentImportRes, } from '../interface/student';

@Injectable()
export class StudentService {
  constructor(
    @Inject(forwardRef(() => 
      StudentUrlService)
    )
    private studentUrlService: StudentUrlService

  ) {}

  async addStudent(student: CreateStudentDto, userRole: User): Promise<StudentImportRes> {
    
    const registerStudent = new Student();
    registerStudent.courseCompletion = student.courseCompletion;
    registerStudent.courseEngagement = student.courseEngagement;
    registerStudent.projectDegree = student.projectDegree;
    registerStudent.teamProjectDegree = student.teamProjectDegree;
    registerStudent.createdBy = userRole.id;
    registerStudent.user = await User.findOneBy({ id: student.user, });
    await registerStudent.save();
    const studentUrl: createStudentUrlDto = { urls: student.bonusProjectUrls, studentId: registerStudent.id, };
    registerStudent.bonusProjectUrls = await this.studentUrlService.addStudentUrl(studentUrl, userRole);
    await registerStudent.save();
    return registerStudent;
  }
}
