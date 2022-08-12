import { Module, } from '@nestjs/common';
import { StudentProfilePortfolioUrlService, } from './student-profile-portfolio-url.service';
import { StudentProfilePortfolioUrlController, } from './student-profile-portfolio-url.controller';

@Module({
  providers: [ StudentProfilePortfolioUrlService, ],
  controllers: [ StudentProfilePortfolioUrlController, ],
  exports:[ StudentProfilePortfolioUrlService, ],
})
export class StudentProfilePortfolioUrlModule {}
