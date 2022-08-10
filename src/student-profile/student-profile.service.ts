import { StudentProfile, } from './entities/student-profile.entity';
import { ConflictException, Injectable, } from '@nestjs/common';
import { CreateUserProfileRes, } from '../interface/student-profile';
import { User, } from 'src/user/entities/user.entity';
import { CreateStudentProfileDto, } from './dto/create-student-profile.dto';
import { config, } from '../app.utils';

@Injectable()
export class StudentProfileService {

  async createStudentProfile(createStudentProfile: CreateStudentProfileDto, user: User): Promise<CreateUserProfileRes> { 

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
    newStudentProfile.user = user;
    newStudentProfile.createdBy = user.id;
    await newStudentProfile.save();
    return newStudentProfile;
  }
}
