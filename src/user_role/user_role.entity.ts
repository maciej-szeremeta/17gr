import { UserRoleEnum, UserRoleItem, } from '../interface/user-role';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { User, } from '../user/user.entity';

@Entity('users_role')
export class UserRole extends BaseEntity implements UserRoleItem{

   @PrimaryGeneratedColumn('uuid')
     id: string;

   @Column({ length:6, unique:true, })
     type: UserRoleEnum;

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

  // TODO: Sprawdzić czy type jest unique

}