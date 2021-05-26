import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegramOptionsInterface } from './telegram-options.interface';
import { Telegraf } from 'telegraf';

export const tg_config = 'bot options';
export const telegraf_obj = 'telegraf tg-bot interface';
export const TG_PROVIDERS: Provider[] = [
  {
    provide: tg_config,
    inject: [ConfigService],
    useFactory: (cs: ConfigService): TelegramOptionsInterface => ({
      token: cs.get('TELEGRAM_BOT_TOKEN'),
      chatId: '664293919',
    }),
  },
  {
    provide: telegraf_obj,
    inject: [tg_config],
    useFactory: (tg_opt: TelegramOptionsInterface) => {
      return new Telegraf(tg_opt.token);
    },
  },
];
