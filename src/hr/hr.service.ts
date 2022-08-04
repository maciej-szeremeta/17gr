import { HrEntity, } from './../interface/hr';
import { Hr, } from '../hr/entities/hr.entity';
import { Injectable, } from '@nestjs/common';

@Injectable()
export class HrService {

  async getOneHr(id:string): Promise<HrEntity> {
    return await Hr.findOneByOrFail({
      id,
    });
  }
}
