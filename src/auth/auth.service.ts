import { Injectable, } from '@nestjs/common';
import { LoginUserDto, } from './dto/login.dto';
import { Response, }from 'express';
import { User, } from '../user/entities/user.entity';
import { comparePwd, } from '../utils/hash-pwd';
import { sign, } from 'jsonwebtoken';
import { v4 as uuid, } from 'uuid';
import { config, } from 'src/app.utils';

@Injectable()
export class AuthService {

  private createToken(currentTokenId: string): { accessToken: string, expiresIn: number }{
    const payload = { id: currentTokenId, };
    const expiresIn = 60 * 60 * 24 * 1000;

    const accessToken = sign(payload, config.secretKeys.jwt, { expiresIn, });
    
    return { accessToken, expiresIn, };
  }

  private async generateToken(user: User):Promise<string> {
    let token;
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
     
      const user = await User.findOneBy({ email: req.email, });
      
      const validPwd = await comparePwd (
        req.pwd, user.pwdHash
      );

      if (!user || !validPwd) {
        return res.json({ error: config.messageErr.login[ config.languages ], });
      }

      const token = this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: config.configDomain.secure,
          domain: config.configDomain.domena,
          path:'/',
          httpOnly: true,
        })
        .json({ ok: true, });
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
        secure: config.configDomain.secure,
        domain: config.configDomain.domena,
        httpOnly: true,
      });
      return res.json({ ok:true, });
    }
    catch (err) {
      return res.json({ error:err.message, });
    }
  }
}
