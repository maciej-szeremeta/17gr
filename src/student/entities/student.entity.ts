import { StudentProfile, } from '../../student-profile/entities/student-profile.entity';
import { User, } from '../../user/entities/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { StudentUrl, } from 'src/student-url/entities/student-url.entity';

@Entity()
export class Student extends BaseEntity{

@PrimaryGeneratedColumn('uuid')
  id: string;

@Column({ type:'tinyint', default: 0, })
  courseCompletion: number;

@Column({ type:'tinyint', default: 0, })
  courseEngagement: number;

@Column({ type:'tinyint', default: 0, })
  projectDegree: number;

@Column({ type:'tinyint', default: 0, })
  teamProjectDegree: number;
  
@Column({ length:36, })
  createdBy: string | null;

@CreateDateColumn()
  createdAt: Date;
   
@UpdateDateColumn()
  updatedAt: Date;
   
@OneToOne(() => 
  User)
  @JoinColumn()
  user: User;
  
@OneToMany(
  () => 
    StudentUrl, studenturl => 
    studenturl.studentId
)
@JoinColumn()
  bonusProjectUrls: StudentUrl[];

@OneToOne(() => 
  StudentProfile)
  studentProfileId: StudentProfile;

}