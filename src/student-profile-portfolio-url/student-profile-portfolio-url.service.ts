import { Injectable, } from '@nestjs/common';
import { StudentProfile, } from '../student-profile/entities/student-profile.entity';
import { StudentPortfolioUrlRes, } from '../interface/student-profile-portfolio-url';
import { StudentProfilePortfolioUrl, } from './entities/student-profile-portfolio-url.entity';
import { User, } from '../user/entities/user.entity';
import { createStudentPortfolioUrlDto, } from './dto/create-student-portfolio-url.dto';

@Injectable()
export class StudentProfilePortfolioUrlService {
  async addStudentPortfolioUrl(studentPortfolioUrl: createStudentPortfolioUrlDto, userRole: User)/*:Promise<StudentPortfolioUrlRes>*/ {
    const { urls, studentPortfolioId, } = studentPortfolioUrl;
    const urlArr:StudentPortfolioUrlRes = [];
    for await (const url of urls) {
      const newStudentPortfolioUrl = new StudentProfilePortfolioUrl();
      newStudentPortfolioUrl.url = url;
      newStudentPortfolioUrl.createdBy = userRole.id;
      newStudentPortfolioUrl.studentProfile = await StudentProfile.findOneBy({ id: studentPortfolioId, });
      await newStudentPortfolioUrl.save();
      urlArr.push(newStudentPortfolioUrl);
    }
    return urlArr;
  }
}
