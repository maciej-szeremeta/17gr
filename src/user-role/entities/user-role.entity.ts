import { BaseEntity, Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, UpdateDateColumn, } from 'typeorm';
import { User, } from '../../user/entities/user.entity';

@Entity()
export class UserRole extends BaseEntity{

  @Column({ type:'uuid', })
  @Generated('uuid')

  // @PrimaryGeneratedColumn('uuid')
    id: string;

  @PrimaryColumn({ length: 7, })
    type: string;
  
  @Column({ length:36, nullable:true, default:null, })
    createdBy:string | null;

  @CreateDateColumn()
    createdAt: Date;
     
  @UpdateDateColumn()
    updateAt: Date;
     
  @OneToMany(
    () => 
      User, user => 
      user.role
  )
    typeRole: User[];

}