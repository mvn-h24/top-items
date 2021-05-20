import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { JwtSecretRequestType } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

export const jwtConfigFactory = async (
  cs: ConfigService,
): Promise<JwtModuleOptions> => {
  return {
    secret: cs.get('JWT_SECRET'),
  };
};
