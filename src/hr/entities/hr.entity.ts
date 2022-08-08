import { User, } from '../../user/entities/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { Student, } from '../../student/entities/student.entity';

@Entity()
export class Hr extends BaseEntity{

@PrimaryGeneratedColumn('uuid')
  id: string;

@Column()
  fullName: string;

@Column()
  company: string;

@Column({ default: 1, })
  maxReservedStudents: number;
  
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

}