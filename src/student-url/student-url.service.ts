import { StudentUrlEntity, } from './../interface/student-url';
import { createStudentUrlDto, } from './dto/create-student-url.dto';
import { Injectable, } from '@nestjs/common';
import { User, } from '../user/entities/user.entity';
import { StudentUrl, } from './entities/student-url.entity';

@Injectable()
export class StudentUrlService {

  async addStudentUrl(url: createStudentUrlDto, userRole:User): Promise<StudentUrlEntity> {
    
    const newStudentUrl = new StudentUrl();
    newStudentUrl.url = url.url;
    newStudentUrl.createdBy = userRole.id;

    await newStudentUrl.save();
    return newStudentUrl;
  }
}
