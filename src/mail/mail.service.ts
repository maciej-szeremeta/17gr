import { Injectable, } from '@nestjs/common';
import { MailerService, } from '@nestjs-modules/mailer';

interface confirmMail{
  role: string,
  userId: string,
  tokenId: string
}
@Injectable()
export class MailService {

  constructor(private readonly mailService: MailerService) { }
   
  async confirmMail(to: string, subject: string, template: string, context: confirmMail):Promise<any> {
    return this.mailService.sendMail({ to, subject, template, context, });
  }
}
