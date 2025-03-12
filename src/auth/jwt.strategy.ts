import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        '246dba9eade2c75e2075da76a8cd1bcb2fc04b5ef8918b352349fa7bdbce1751',
    });
  }

  validate(payload: { userId: string; email: string; role: string }) {
    return { userId: payload.userId, email: payload.email, role: payload.role };
  }
}
