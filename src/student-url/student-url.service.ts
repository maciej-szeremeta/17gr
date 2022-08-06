import { StudentUrlEntity, } from './../interface/student-url';
import { createStudentUrlDto, } from './dto/create-student-url.dto';
import { Injectable, } from '@nestjs/common';
import { User, } from '../user/entities/user.entity';
import { StudentUrl, } from './entities/student-url.entity';
import { Student, } from '../student/entities/student.entity';

@Injectable()
export class StudentUrlService {

  async addStudentUrl(url: createStudentUrlDto, userRole:User): Promise<StudentUrlEntity> {
    
    const newStudentUrl = new StudentUrl();
    newStudentUrl.url = url.url;
    newStudentUrl.createdBy = userRole.id;
    newStudentUrl.student = await new Student();

    await newStudentUrl.save();
    return newStudentUrl;
  }
}
