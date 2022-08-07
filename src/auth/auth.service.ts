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
    const expiresIn = 15 * 60 * 1000;

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
     
      const user = (await User.find({ where: { email: req.email, }, relations: [ 'role', ], }))[ 0 ];
      
      const validPwd = await comparePwd (
        req.pwd, user.pwdHash
      );

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
}
