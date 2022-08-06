import { Student, } from './../student/entities/student.entity';
import { Injectable, Inject, forwardRef, NotFoundException, ConflictException, } from '@nestjs/common';
import { UserRegisterRes, } from '../interface/user';
import { hashPwd, } from '../utils/hash-pwd';
import { RegisterAdminDto, } from './dto/register-admin.dto';
import { User, } from './entities/user.entity';
import { UserRoleEnum, } from '../interface/user-role';
import { UserRole, } from 'src/user-role/entities/user-role.entity';
import { RegisterHrDto, } from './dto/register-hr.dto';
import { MailService, } from '../mail/mail.service';
import { v4 as uuid, }from 'uuid';
import { HrService, } from '../hr/hr.service';
import { HrEntity, HrRegisterRes, } from '../interface/hr';
import { StudentImportRes, } from '../interface/student';
import { MulterDiskUploadFiles, } from '../interface/file';
import { unlink, } from 'fs';
import { storageDir, } from '../utils/storage';
import { join, } from 'path';
import * as csv from 'csvtojson';
import { config, } from '../app.utils';
import { StudentUrlService, } from '../student-url/student-url.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => 
      MailService)
    )
    private mailService: MailService,
    @Inject(forwardRef(() => 
      HrService)
    )
    private hrService: HrService,
    @Inject(forwardRef(() => 
      StudentUrlService)
    )
    private studentUrlService: StudentUrlService
  ) {}

  async registerAdmin(newUser: RegisterAdminDto): Promise<UserRegisterRes> {

    const user_role = await UserRole.findOneByOrFail({ type: UserRoleEnum.ADMIN, });

    if(!user_role){
      throw new NotFoundException('Nie odnaleziona Encji');
    }
    const registerUser = new User();
    registerUser.email = newUser.email;
    registerUser.pwdHash = await hashPwd(newUser.pwd);
    registerUser.isActive=true;
    await registerUser.save();
    registerUser.createdBy = registerUser.id;
    registerUser.role = user_role;
    await registerUser.save();

    return this.filterAdmin(registerUser);
  };

  filterAdmin(user: User): UserRegisterRes {
    const { id, email, } = user;
    return {
      id,
      email,
    };
  };

  async registerHr(newUser: RegisterHrDto, userRole: User): Promise<HrRegisterRes> {

    const user = await User.findOneBy({ email: newUser.email, });
    if (user) {
      throw new ConflictException(config.messageErr.regiserConflictMail[ config.languages ](user.email));
    }

    const user_role = await UserRole.findOneByOrFail({ type: UserRoleEnum.HR, });

    if(!user_role){
      throw new NotFoundException('Nie odnaleziona Encji');
    }
    
    const registerUser = new User();

    registerUser.email = newUser.email;
    registerUser.createdBy = userRole.id;
    await registerUser.save();
    
    registerUser.pwdHash = uuid();
    registerUser.createdBy = registerUser.id;
    registerUser.role = user_role;
    const newUsers = await registerUser.save();

    const hr = { ...newUser, user:newUsers.id, };
    const registerHr = await this.hrService.addHr(hr, userRole);

    try {
      await this.mailService.confirmMail(
        newUser.email, `Witaj ${registerHr.fullName} w aplikacji HH 17! Potwierdz Email`, './confirm', {
          role: registerHr.fullName,
          userId: registerUser.id,
          tokenId: registerUser.currentTokenId,
        });
    }
    catch (error) {
      console.error(error);
    }

    return this.filterHr(registerHr);
  };

  filterHr(hr: HrEntity):HrRegisterRes{
    const { user, fullName, company, maxReservedStudents, }=hr;
    return { id: user.id, email:user.email, fullName, company, maxReservedStudents, };
  };

  async importStudent( userRole: User, files: MulterDiskUploadFiles): Promise<StudentImportRes> {
    const csvFile = files?.csv?.[ 0 ] ?? null;
    try {

      // Wykonanie kodu z pol textowych
      if (csvFile) {
        const jsonData = await csv({
          flatKeys: false,
          checkType: true,
          delimiter: ';',
          ignoreEmpty: true,
        }).fromFile(csvFile.path);

        const conflictEmails = [];
        for await (const { email, } of jsonData) { 
          const user = await User.findOneBy({ email, });
          if (user) {
            conflictEmails.push(email);
          }
        }
        console.log(conflictEmails);
        if (conflictEmails.length > 0) {
          throw new ConflictException(config.messageErr.regiserConflictMail[ config.languages ](conflictEmails));
        }
        const user_role = await UserRole.findOneByOrFail({ type: UserRoleEnum.STUDENT, });

        if(!user_role){
          throw new NotFoundException('Nie odnaleziona Encji');
        }

        for await (const newUser of jsonData) {
          const registerUser = new User();

          registerUser.email = newUser.email;
          registerUser.createdBy = userRole.id;
          await registerUser.save();
    
          registerUser.pwdHash = uuid();
          registerUser.createdBy = userRole.id;
          registerUser.role = user_role;
          await registerUser.save();

          const userId = await User.findOneBy({ id: registerUser.id, });

          const registerStudent = new Student();
          registerStudent.courseCompletion = newUser.courseCompletion;
          registerStudent.courseEngagement = newUser.courseEngagement;
          registerStudent.projectDegree = newUser.projectDegree;
          registerStudent.teamProjectDegree = newUser.teamProjectDegree;
          registerStudent.createdBy = userRole.id;
          registerStudent.user = userId;
          await registerStudent.save();

          // this.studentUrlService.addStudentUrl()
          try {
            await this.mailService.confirmMail(
              newUser.email, 'Witaj Kursancie w aplikacji HH 17! Potwierdz Email', './confirm', {
                role: 'Kursancie',
                userId: registerUser.id,
                tokenId: registerUser.currentTokenId,
              });
          }
          catch (error) {
            console.error(error);
          }
        }

        // Wykonanie kodu z pliku csv
      }
      return {
        id:'123',
        email:'mama@o2.pl',
        courseCompletion: 5,
        courseEngagement: 5,
        projectDegree: 5,
        teamProjectDegree: 5,
      };
    }
    catch (err) {
      try {

        // Usówanie pliku gdy pójdzie cos nie tak
        if (csvFile) {       
          unlink(join(storageDir(), 'csv', csvFile.filename), err => { console.error(err); });
        }
      }
      catch (err2) {
        throw err2;
      }
      throw err;
    }

  };
}
