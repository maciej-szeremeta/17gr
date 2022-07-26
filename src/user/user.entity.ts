import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, } from 'typeorm';

enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  HR = 'hr'
}

@Entity()
export class User extends BaseEntity {
   @PrimaryGeneratedColumn('uuid')
     id: string;

   // email
   @Column({ length:255, })
     email: string;

   @Column({ length:60, })
     pwd: string;

   // uuid
   @Column({ type:'uuid', default:null, length:36, })
     registerToken: string | null;
   
   // tinInt (true/false)
   @Column({ type: 'tinyint',
     default: false, })
     isActive: boolean;

   // Enum [Admin,Hr,Student]
   @Column({
     type: 'enum',
     enum: UserRole,
     default: UserRole.STUDENT,
   })
     role: string;
}