import { StudentProfilePortfolioUrlModule, } from './../student-profile-portfolio-url/student-profile-portfolio-url.module';
import { Module, } from '@nestjs/common';
import { StudentProfileService, } from './student-profile.service';
import { StudentProfileController, } from './student-profile.controller';

@Module({
  imports:[ StudentProfilePortfolioUrlModule, ],
  providers: [ StudentProfileService, ],
  controllers: [ StudentProfileController, ],
})
export class StudentProfileModule {}
