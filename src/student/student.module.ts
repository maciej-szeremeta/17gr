import { Module, forwardRef, } from '@nestjs/common';
import { StudentService, } from './student.service';
import { StudentController, } from './student.controller';
import { StudentUrlModule, } from '../student-url/student-url.module';

@Module({
  imports:[ forwardRef(() =>  
    StudentUrlModule), ],
  providers: [ StudentService, ],
  controllers: [ StudentController, ],
  exports:[ StudentService, ],
})
export class StudentModule {}
