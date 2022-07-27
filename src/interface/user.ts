export interface UserItem {
   email: string;
   pwd: string | null;
   registerToken: string | null;
   isActive: boolean;
}