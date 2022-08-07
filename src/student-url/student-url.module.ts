import { Module, } from '@nestjs/common';
import { StudentUrlService, } from './student-url.service';
import { StudentUrlController, } from './student-url.controller';

@Module({
  providers: [ StudentUrlService, ],
  controllers: [ StudentUrlController, ],
  exports:[ StudentUrlService, ],
})
export class StudentUrlModule {}
