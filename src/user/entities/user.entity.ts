import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { UserRole, } from '../../user-role/entities/user-role.entity';

@Entity()
export class User extends BaseEntity{

   @PrimaryGeneratedColumn('uuid')
     id: string;

   @Column({ length:255, })
     email: string;

  @Column({
    length: 60,
  })
    pwdHash: string;

  @Column({
    type: 'uuid',
    default: null,
    length: 36,
  })
    currentTokenId: string | null;
   
  @Column({ type: 'tinyint',
    default: false, })
    isActive: boolean;

 @ManyToOne(
   () => 
     UserRole, userRole => 
     userRole.typeRole
 )
 @JoinColumn()
   role: UserRole;
  
  @Column({ length:36, })
    createdBy: string | null;

  @CreateDateColumn()
    createdAt: Date;
   
  @UpdateDateColumn()
    updateAt: Date;

}