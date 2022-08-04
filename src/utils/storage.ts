import { join, } from 'path';

export function storageDir() {
  console.log(__dirname);
  return join(__dirname, '../../../storage');
}