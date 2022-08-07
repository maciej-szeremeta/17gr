import { createStudentUrlDto, } from './dto/create-student-url.dto';
import { Injectable, } from '@nestjs/common';
import { User, } from '../user/entities/user.entity';
import { StudentUrl, } from './entities/student-url.entity';
import { Student, } from '../student/entities/student.entity';

@Injectable()
export class StudentUrlService {

  async addStudentUrl(studentUrl: createStudentUrlDto, userRole: User)/*: Promise<StudentUrlEntity[]>*/ {
    const { urls, studentId, } = studentUrl;
    const urlArr = [];
    for await (const url of urls) {
      const newStudentUrl = new StudentUrl();
      newStudentUrl.url = url;
      newStudentUrl.createdBy = userRole.id;
      newStudentUrl.student = await Student.findOneBy({ id: studentId, });
      console.log(url);
      await newStudentUrl.save();
      urlArr.push(newStudentUrl);
    }
    return urlArr;
  }
}
