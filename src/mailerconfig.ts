import { HandlebarsAdapter, } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export = {
  transport: {
    host: 'localhost',
    port: 2500,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'user', // generated ethereal user
      pass: 'user', // generated ethereal password
    },
  },
  defaults: {
    from : 'admin@test.com',
  },
  template: {
    dir: './templates/email',
    adapted: new HandlebarsAdapter(),
    options: {
      strict:true,
    },
  },
}