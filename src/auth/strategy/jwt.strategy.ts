import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { PassportStrategy, } from '@nestjs/passport';
import { Strategy, } from 'passport-jwt';
import { config, } from 'src/app.utils';
import { User, } from '../../user/entities/user.entity';

export interface JwtPayload{
   id:string
}

const cookieExtractor = function (req: any): null | string{
  return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: config.secretKeys.jwt,
    });
  }
   
  async validate(payload: JwtPayload, done: (err, user) => void) {
    console.log(payload);
   
    if (!payload || !payload.id) {
      return done(new UnauthorizedException(), false);
    }

    const user = await User.findOneBy({ currentTokenId: payload.id, });
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
     
    done(null, user);
  }
}
