import { UserRoleEnum, UserRoleItem, } from '../../interface/user-role';
import { BaseEntity, Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, UpdateDateColumn, } from 'typeorm';
import { User, } from '../../user/entities/user.entity';

@Entity()
export class UserRole extends BaseEntity implements UserRoleItem{

  @Column({ type:'uuid', })
  @Generated('uuid')
    id: string;

  @PrimaryColumn({ length: 7, })
    type: UserRoleEnum;
  
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
    user: User;

}