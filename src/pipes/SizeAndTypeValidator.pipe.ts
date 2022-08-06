import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, UnprocessableEntityException, } from '@nestjs/common';

interface CheckFilePipeOptions{
  size: number;
  type: string
}

@Injectable()
export class SizeAndTypeFilePipe implements PipeTransform {

  constructor(private options: CheckFilePipeOptions) { }

  transform(file: any, metadata: ArgumentMetadata) {

    const { csv, } = file;
    const { options, } = this;
    const fileType = (csv[ 0 ].mimetype).split('/')[ 1 ];
    
    if (!csv) {
      throw new UnprocessableEntityException(`Dołącz plik w formacie .${options.type}!`);
    }

    if (csv?.length > 1) {
      throw new UnprocessableEntityException('Można wysłać tylko jeden plik');
    }
    
    if (fileType !== options.type) {
      throw new UnprocessableEntityException(`Plik powinien mieć format *.${options.type}!`);
    }
    
    if (csv[ 0 ].size > options.size|| isNaN(csv[ 0 ].size)) {
      throw new UnprocessableEntityException(`Plik nie może być większy niż ${options.size} B`);
    }

    console.log(metadata);
    
    return file;
  }
}