import { Injectable, Inject, forwardRef, NotFoundException, } from '@nestjs/common';
import { UserRoleService, } from '../user-role/user-role.service';
import { UserRegisterRes, } from '../interface/user';
import { hashPwd, } from '../utils/hash-pwd';
import { RegisterUserDto, } from './dto/register-user.dto';
import { User, } from './entities/user.entity';
import { UserRoleEnum, } from '../interface/user-role';
import { UserRole, } from 'src/user-role/entities/user-role.entity';
import { clearConfigCache, } from 'prettier';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => 
      UserRoleService))
    private userRoleService: UserRoleService
  ) {}

  filter(user: User): UserRegisterRes {
    const { id, email, } = user;
    return {
      id,
      email,
    };
  };

  async registerAdmin(newUser: RegisterUserDto): Promise<UserRegisterRes> {

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
}
