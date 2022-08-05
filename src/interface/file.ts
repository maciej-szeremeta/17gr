export interface MulterDiskUploadFiles{
   [fieldname: string]: {
      filename: string;
      originalname: string;
      encoding: string;
      size: number;
      mimetype: string;
      fieldname: string;
      path: string;
      destination: string;
   }[] | undefined
}