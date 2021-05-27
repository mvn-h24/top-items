import { TelegramOptionsInterface } from 'src/telegram/telegram-options.interface';
import { ConfigService } from '@nestjs/config';

export const TgConfig = (cs: ConfigService): TelegramOptionsInterface => {
  const token = cs.get('TELEGRAM_BOT_TOKEN');
  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN not found');
  }
  return {
    token: token,
    chatId: cs.get('DEFAULT_CHAT_ID') ?? '',
  };
};
