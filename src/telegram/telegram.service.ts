import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TelegramOptionsInterface } from './telegram-options.interface';
import { TELEGRAM_MODULE_OPTS } from './telegram.constants';

@Injectable()
export class TelegramService {
  telegraf: Telegraf;
  constructor(
    @Inject(TELEGRAM_MODULE_OPTS)
    private readonly tgOpt: TelegramOptionsInterface,
  ) {
    this.telegraf = new Telegraf(tgOpt.token);
  }
  async sendMessage(
    message: string,
    chatId: string = this.tgOpt.chatId,
  ): Promise<void> {
    await this.telegraf.telegram.sendMessage(chatId, message);
  }
}
