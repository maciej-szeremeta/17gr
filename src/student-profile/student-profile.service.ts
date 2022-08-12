import { StudentProfile, } from './entities/student-profile.entity';
import { ConflictException, forwardRef, Inject, Injectable, } from '@nestjs/common';
import { CreateUserProfileRes, } from '../interface/student-profile';
import { User, } from '../user/entities/user.entity';
import { CreateStudentProfileDto, } from './dto/create-student-profile.dto';
import { config, } from '../app.utils';
import { StudentProfilePortfolioUrlService, } from '../student-profile-portfolio-url/student-profile-portfolio-url.service';
import { createStudentPortfolioUrlDto, } from '../student-profile-portfolio-url/dto/create-student-portfolio-url.dto';

@Injectable()
export class StudentProfileService {

  constructor(
    @Inject(forwardRef(() => 
      StudentProfilePortfolioUrlService)
    )
    private studentProfilePortfolioUrlService: StudentProfilePortfolioUrlService

  ) {}

  async createStudentProfile(createStudentProfile: CreateStudentProfileDto, userRole: User): Promise<CreateUserProfileRes> { 
    const userItem = await StudentProfile.findOneBy({ githubUsername: createStudentProfile.githubUsername, });
    if (userItem) {
      throw new ConflictException(config.messageErr.idGitHubUser[ config.languages ](createStudentProfile.githubUsername));
    }
    
    const newStudentProfile = new StudentProfile();
    newStudentProfile.tel = createStudentProfile.tel;
    newStudentProfile.firstName = createStudentProfile.firstName;
    newStudentProfile.lastName = createStudentProfile.lastName;
    newStudentProfile.githubUsername = createStudentProfile.githubUsername;
    newStudentProfile.bio = createStudentProfile.bio;
    newStudentProfile.expectedContractType = createStudentProfile.expectedContractType;
    newStudentProfile.targetWorkCity = createStudentProfile.targetWorkCity;
    newStudentProfile.expectedContractType = createStudentProfile.expectedContractType;
    newStudentProfile.expectedSalary = createStudentProfile.expectedSalary;
    newStudentProfile.canTakeApprenticeship = createStudentProfile.canTakeApprenticeship;
    newStudentProfile.monthsOfCommercialExp = createStudentProfile.monthsOfCommercialExp;
    newStudentProfile.education = createStudentProfile.education;
    newStudentProfile.workExperience = createStudentProfile.workExperience;
    newStudentProfile.courses = createStudentProfile.courses;
    newStudentProfile.user = userRole;
    newStudentProfile.createdBy = userRole.id;
    await newStudentProfile.save();
    const studentProfileUrl:createStudentPortfolioUrlDto = { urls: createStudentProfile.portfolioUrls, studentPortfolioId: newStudentProfile.id, };
    newStudentProfile.studentProfilePortfolioUrl = await this.studentProfilePortfolioUrlService.addStudentPortfolioUrl(studentProfileUrl, userRole);
    await newStudentProfile.save();
    return newStudentProfile;
  }
}
