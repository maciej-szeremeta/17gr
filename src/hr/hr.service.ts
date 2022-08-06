import { HrEntity, } from './../interface/hr';
import { Hr, } from '../hr/entities/hr.entity';
import { Injectable, } from '@nestjs/common';
import { User, } from '../user/entities/user.entity';
import { CreateHrDto, } from './dto/create-hr.dto';

@Injectable()
export class HrService {

  async addHr(hr: CreateHrDto, userRole:User): Promise<HrEntity> {
    
    const registerHr = new Hr();
    registerHr.fullName = hr.fullName;
    registerHr.company = hr.company;
    registerHr.maxReservedStudents = hr.maxReservedStudents;
    registerHr.createdBy = userRole.id;
    registerHr.user = await User.findOneBy({ id: hr.user, });;
    await registerHr.save();
    return registerHr;
  }

  async getOneHr(id:string): Promise<HrEntity> {
    return await Hr.findOneByOrFail({
      id,
    });
  }
}
