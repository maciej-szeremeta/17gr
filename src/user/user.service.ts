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

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => 
      MailService))
    private mailService: MailService
  ) {}

  filter(user: User): UserRegisterRes {
    const { id, email, } = user;
    return {
      id,
      email,
    };
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

    return this.filter(registerUser);
  };

  async registerHr(newUser: RegisterUserDto, userRole:User): Promise<UserRegisterRes> {
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
    registerUser.pwdHash = await hashPwd(newUser.pwd);
    registerUser.createdBy = userRole.id;

    await registerUser.save();
    registerUser.createdBy = registerUser.id;
    registerUser.currentTokenId = uuid();
    registerUser.role = user_role;

    await registerUser.save();
    try {
      await this.mailService.confirmMail(
        newUser.email, 'Witaj w aplikacji HH! Potwierdz Email', './confirm', {
          role: registerUser.role.type,
          userId: registerUser.id,
          tokenId: registerUser.currentTokenId,
        });
    }
    catch (error) {
      console.error(error);
    }

    return this.filter(registerUser);
  };
}
