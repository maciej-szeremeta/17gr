import { Student, } from './../../student/entities/student.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';

@Entity()
export class StudentUrl extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    url: string;
  
  @Column({ length:36, nullable:true, default:null, })
    createdBy:string | null;

  @CreateDateColumn()
    createdAt: Date;
     
  @UpdateDateColumn()
    updatedAt: Date;
     
  @ManyToOne(
    () => 
      Student, student => 
      student.id
  )
   @JoinColumn()
    studentId: Student;

}