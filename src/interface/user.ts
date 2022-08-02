export interface UserEntity {
   id: string;
   email: string;
   pwdHash: string;
   currentTokenId: string | null
   createdBy:string
}