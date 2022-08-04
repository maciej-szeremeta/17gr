export interface StudentEntity {
   id?: string;
   email?:string
   courseCompletion: number;
   courseEngagement: number;
   projectDegree: number;
   teamProjectDegree: number;
}

export type GetOneStudentRes = StudentEntity | null;

export type StudentImportRes = StudentEntity;