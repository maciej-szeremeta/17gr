import { forwardRef, Inject, Injectable, NotFoundException, } from '@nestjs/common';
import { LoginUserDto, } from './dto/login.dto';
import { Response, }from 'express';
import { User, } from '../user/entities/user.entity';
import { comparePwd, hashPwd, } from '../utils/hash-pwd';
import { sign, } from 'jsonwebtoken';
import { v4 as uuid, } from 'uuid';
import { config, } from 'src/app.utils';
import { PasswordUserDto, } from './dto/set-password.dto';
import { MailService, } from '../mail/mail.service';
import { ResetPasswordDto, } from './dto/reset-password.dto';

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => 
      MailService)
    )
    private mailService: MailService
  ) {}

  private createToken(currentTokenId: string): { accessToken: string, expiresIn: number }{
    const payload = { id: currentTokenId, };
    const expiresIn = 15 * 60 * 1000;

    const accessToken = sign(payload, config.secretKeys.jwt, { expiresIn, });
    
    return { accessToken, expiresIn, };
  }

  private async generateToken(user: User):Promise<string> {
    let token: string | PromiseLike<string>;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOneBy({ currentTokenId: token, });
    } while (!!userWithThisToken);
 
    user.currentTokenId = token;
    await user.save();
    return token;
  }

  async login(req: LoginUserDto, res: Response) {
    try {
     
      const user = (await User.find({ where: { email: req.email, }, relations: [ 'role', ], }))[ 0 ];
      
      let validPwd: boolean;
      if (user) {
        validPwd = await comparePwd (
          req.pwd, user.pwdHash
        );
      }

      if (!user || !validPwd) {
        return res.json({ error: config.messageErr.loginInvalidData[ config.languages ], });
      }

      if(!user.isActive){
        return res.json({ error: config.messageErr.loginIsActive[ config.languages ](user.email), });
      }

      const token = this.createToken(await this.generateToken(user));
      return res
        .cookie('jwt', token.accessToken, {
          secure: config.configCookie.secure,
          domain: config.configCookie.domain,
          path:config.configCookie.path,
          httpOnly: config.configCookie.httpOnly,
          maxAge:token.expiresIn,
        })
        .json({ msg: true, email:user.email, role:user.role.type, } );
    }
    catch (err) {
      return res.json({ error: err.message, });
    }
  }

  async logout(user:User, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: config.configCookie.secure,
        domain: config.configCookie.domain,
        httpOnly: true,
      });
      return res.json({ msg : true, });
    }
    catch (err) {
      return res.json({ error:err.message, });
    }
  }

  async active(userId:string, tokenId: string, res: Response) {
    try {
     
      const user = (await User.find({ where: { id: userId, pwdHash:tokenId, }, relations: [ 'role', ], }))[ 0 ];

      if (!user) {
        return res.redirect('http://localhost:3000/bad-request');
      }

      const token = this.createToken(await this.generateToken(user));
      return res
        .cookie('jwt', token.accessToken, {
          secure: config.configCookie.secure,
          domain: config.configCookie.domain,
          path:config.configCookie.path,
          httpOnly: config.configCookie.httpOnly,
        })
        .redirect('http://localhost:3000/password');
    }
    catch (err) {
      return res.json({ error: err.message, });
    }
  }

  async setPassword( pwd: PasswordUserDto, res:Response, user: User) {
    try {
     
      const userUpdate = await User.findOneBy({ id: user.id, } );
      if (!userUpdate) {
        return res.redirect('http://localhost:3000/bad-request');
      }

      userUpdate.pwdHash = await hashPwd(pwd.pwd);
      userUpdate.isActive = true;
      userUpdate.currentTokenId = null;

      await userUpdate.save();
      try {
        await this.mailService.gratyMail(
          userUpdate.email, 'Witaj Użytkowniku w aplikacji HH 17! Potwierdz Email', './graty', {
            email: userUpdate.email,
          });
      }
      catch (error) {
        console.error(error);
      }

      return res.clearCookie('jwt', {
        secure: config.configCookie.secure,
        domain: config.configCookie.domain,
        httpOnly: true,
      }).redirect('http://localhost:3000/login');
    }
    catch (err) {
      return res.json({ error: err.message, });
    }
  }

  async resetPassword( email:ResetPasswordDto, res: Response) {
     
    const userResetPwd = await User.findOneBy({ email: email.email, } );
    console.log(userResetPwd);
    if (!userResetPwd) {
      throw new NotFoundException(`${email.email} nie znajduję się w naszym systemie.`);
    }

    userResetPwd.pwdHash = uuid();
    userResetPwd.isActive = false;
    userResetPwd.currentTokenId = null;

    await userResetPwd.save();
    try {
      await this.mailService.resetPwdMail(
        userResetPwd.email, 'Witaj w aplikacji HH 17! Potwierdz Email', './resetPwd', {
          role: 'Użytkowniku',
          userId: userResetPwd.id,
          tokenId: userResetPwd.currentTokenId,
        });
    }
    catch (error) {
      console.error(error);
    }

    return res.json({ msg : true, });
  }
}
