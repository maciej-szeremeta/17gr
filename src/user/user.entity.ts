import { UserItem, } from '../interfaces/user';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';

@Entity('users')
export class User extends BaseEntity implements UserItem{

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


  @CreateDateColumn()
    createdAt: Date;
   
  @UpdateDateColumn()
    updateAt: Date;

  // TODO: Dodać relacje z tabelą user_role
  role: string;

  // TODO: Sprawdzić czy email jest unique

}