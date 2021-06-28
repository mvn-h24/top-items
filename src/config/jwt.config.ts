import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

const ConfigFactory = async (cs: ConfigService): Promise<JwtModuleOptions> => {
  return {
    secret: cs.get('JWT_SECRET'),
  };
};

export const JwtConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: ConfigFactory,
};
