import { User, } from '../user/entities/user.entity';

export type HrEntity ={
   id: string;
   email:string
   fullName: string;
   company: string;
   maxReservedStudents: number;
   user?:User
} | {
   fullName: string;
   company: string;
   maxReservedStudents: number;
   user?:User
}

export type GetOneHrRes = HrEntity | null;

export type HrRegisterRes = HrEntity;