import { UserRole } from './user-role';

export interface UserEntity {
   email: string;
   pwd: string | null;
   registerToken: string | null;
   isActive: boolean;
   role: UserRole
}