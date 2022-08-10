import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { StudentProfile, } from '../../student-profile/entities/student-profile.entity';

@Entity()
export class StudentProfilePortfolioUrl extends BaseEntity{

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
      StudentProfile, studentProfile => 
      studentProfile.id
  )
   @JoinColumn()
    studentProfile: StudentProfile;
}