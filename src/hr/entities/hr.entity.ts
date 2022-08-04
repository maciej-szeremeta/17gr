import { User, } from '../../user/entities/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';

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

// TODO: Dodać Relacje OnetoOne z user
// TODO: Dodać Relacje ManyToMany z student
}