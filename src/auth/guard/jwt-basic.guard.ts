import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BASIC_JWT } from '../jwt-strategy/jwt-strategy';

@Injectable()
export class JwtBasicGuard extends AuthGuard(BASIC_JWT) {}
