import { UserEntity, } from '../interface/user';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { UserRole, } from '../user_role/user_role.entity';

@Entity('users')
export class User extends BaseEntity implements UserEntity{

   @PrimaryGeneratedColumn('uuid')
     id: string;

   @Column({ length:255, })
     email: string;

  @Column({
    length: 60,
    unique: true,
  })
    pwd: string | null;

  @Column({
    type: 'uuid',
    default: null,
    length: 36,
  })
    registerToken: string | null;
   
  @Column({ type: 'tinyint',
    default: false, })
    isActive: boolean;

 @ManyToOne(
   () => 
     UserRole, userRole => 
     userRole.user
 )
   @JoinColumn()
   role: UserRole[];
  
  @Column()
    createdBy: string;

  @CreateDateColumn()
    createdAt: Date;
   
  @UpdateDateColumn()
    updateAt: Date;

  // TODO: Sprawdzić czy email jest unique

}