import { Injectable, Inject, forwardRef, NotFoundException, ConflictException, } from '@nestjs/common';
import { UserRegisterRes, } from '../interface/user';
import { hashPwd, } from '../utils/hash-pwd';
import { RegisterAdminDto, } from './dto/register-admin.dto';
import { User, } from './entities/user.entity';
import { UserRoleEnum, } from '../interface/user-role';
import { UserRole, } from 'src/user-role/entities/user-role.entity';
import { RegisterUserDto, } from './dto/register-hr.dto';
import { MailService, } from '../mail/mail.service';
import { v4 as uuid, }from 'uuid';
import { Hr, } from '../hr/entities/hr.entity';
import { HrService, } from '../hr/hr.service';
import { HrRegisterRes, } from '../interface/hr';

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
    private hrService: HrService
  ) {}

  filterAdmin(user: User): UserRegisterRes {
    const { id, email, } = user;
    return {
      id,
      email,
    };
  };

  filterHr(hr: Hr): HrRegisterRes{
    const { fullName, company, maxReservedStudents, user, } = hr;
    return { id: user.id, email:user.email, fullName, company, maxReservedStudents, };
  };

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

  async registerHr(newUser: RegisterUserDto, userRole: User): Promise<HrRegisterRes> {

    const user = await User.findOneBy({ email: newUser.email, });
    if (user) {
      throw new ConflictException('Email już istnieje , wybierz inny mail');
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
    await registerUser.save();

    const userId = await User.findOneBy({ id: registerUser.id, });

    const registerHr = new Hr();
    registerHr.fullName = newUser.fullName;
    registerHr.company = newUser.company;
    registerHr.maxReservedStudents = newUser.maxReservedStudents;
    registerHr.createdBy = registerUser.id;
    registerHr.user = userId;
    await registerHr.save();

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
}
