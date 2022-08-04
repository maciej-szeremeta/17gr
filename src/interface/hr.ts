export interface HrEntity {
   id?: string;
   email?:string
   fullName: string;
   company: string;
   maxReservedStudents: number;
}

export type GetOneHrRes = HrEntity | null;

export type HrRegisterRes = HrEntity;