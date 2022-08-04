import { User, } from '../../user/entities/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';

@Entity()
export class Student extends BaseEntity{

@PrimaryGeneratedColumn('uuid')
  id: string;

@Column({ type:'tinyint', default: 0, })
  courseCompletion: number;

@Column({ type:'tinyint', default: 0, })
  courseEngagement: number;

@Column({ type:'tinyint', default: 0, })
  teamProjectDegree: number;
  
@Column({ length:36, })
  createdBy: string | null;

@CreateDateColumn()
  createdAt: Date;
   
@UpdateDateColumn()
  updateAt: Date;
   
@OneToOne(() => 
  User)
  @JoinColumn()
  user:User;

// TODO: Dodać Relacje ManyToOne z student_urls
}