import { Module } from '@nestjs/common';
import { StudentProfileProjectUrlService } from './student-profile-project-url.service';
import { StudentProfileProjectUrlController } from './student-profile-project-url.controller';

@Module({
  providers: [StudentProfileProjectUrlService],
  controllers: [StudentProfileProjectUrlController]
})
export class StudentProfileProjectUrlModule {}
