import { TelegramOptionsInterface } from 'src/modules/telegram/telegram-options.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';

const ConfigFactory = (cs: ConfigService): TelegramOptionsInterface => {
  const token = cs.get('TELEGRAM_BOT_TOKEN');
  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN not found');
  }
  return {
    token: token,
    chatId: cs.get('DEFAULT_CHAT_ID') ?? '',
  };
};
export const TgConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: ConfigFactory,
};
