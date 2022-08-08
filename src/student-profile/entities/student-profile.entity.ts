import { StudentProfilePortfolioUrl, } from './../../student-profile-portfolio-url/entities/student-profile-portfolio-url.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { StudentProfileProjectUrl, } from '../../student-profile-project-url/entities/student-profile-porject-url.entity';
import { User, } from '../../user/entities/user.entity';

export enum ExpectedTypeWork {
  NAMIEJSCU = 'Na miejscu',
  GOTOWOSCDOPRZEPROWADZKI = 'Gotowość do przeprowadzki',
  WYLACZNIEZDALNIE = 'Wyłącznie zdalnie',
  HYBRYDOWO = 'Hybrydowo',
  BEZZNACZENIA = 'Bez znaczenia'
}

export enum ExpectedContractType {
  TYLKOUOP = 'Tylko UoP',
  MOZLIWEB2B = 'Możliwe B2B',
  MOZLIWEUZUOD = 'Możliwe UZ/UoD',
  BRAKPREFERENCJI = 'Brak preferencji '
}

@Entity()
export class StudentProfile extends BaseEntity{

@PrimaryGeneratedColumn('uuid')
  id: string;

@Column({ nullable:true, default: null, })
  tel: number | null;

@Column({ length:57, })
  firstName: string;

@Column({ length:255, })
  lastName: string;

@Column()
  githubUsername: string;
   
@Column()
  bio: string;

@Column({
  type: 'enum',
  enum: ExpectedTypeWork,
  default: ExpectedTypeWork.BEZZNACZENIA,
})
  expectedTypeWork: string;

@Column()
  targetWorkCity: string;
   
@Column({
  type: 'enum',
  enum: ExpectedContractType,
  default: ExpectedContractType.BRAKPREFERENCJI,
})
  expectedContractType: string;
   
@Column({ type:'decimal', scale:2, precision:9, default:0, })
  expectedSalary: number;
   
@Column({ type:'tinyint', default:0, })
  canTakeApprenticeship: number;
   
@Column({ type:'int', default:0, scale:9, })
  monthsOfCommercialExp: number;
   
@Column({ type:'longtext', nullable:true, default:null, })
  education: string;

@Column({ type:'longtext', nullable:true, default:null, })
  workExperience: string;
   
@Column({ type:'longtext', nullable:true, default:null, })
  courses: string;
  
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
    StudentProfilePortfolioUrl, studentProfilePortfolioUrl => 
    studentProfilePortfolioUrl.studentProfile
)
  studentProfilePortfolioUrl: StudentProfilePortfolioUrl[];

@OneToMany(
  () => 
    StudentProfileProjectUrl, studentProfileProjectUrl => 
    studentProfileProjectUrl.studentProfile
)
  studentProfileProjectUrl: StudentProfileProjectUrl[];

}
