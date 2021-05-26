import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const APP_DNS_NAME = 'app web-domain name';
export const APP_PROVIDERS: Provider[] = [
  {
    provide: APP_DNS_NAME,
    inject: [ConfigService],
    useFactory: (cs: ConfigService): string => {
      return cs.get('DOMAIN_NAME') ?? '';
    },
  },
];
