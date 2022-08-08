import { StudentProfile, } from './entities/student-profile.entity';
import { Injectable, } from '@nestjs/common';
import { CreateUserProfileRes, } from '../interface/student-profile';

@Injectable()
export class StudentProfileService {

  async createStudentProfile(createStudentProfile, user)/*: Promise<CreateUserProfileRes>*/ { 
    const newStudentProfile = new StudentProfile();
    // console.log(createStudentProfile);

    //  await newStudentProfile.save();
    //  return newStudentProfile;
    return { msg: 'ok', };
  }
}
