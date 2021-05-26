import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { telegraf_obj, tg_config } from './telegram.proviers';
import { TelegramOptionsInterface } from './telegram-options.interface';

@Injectable()
export class TelegramService {
  constructor(
    @Inject(telegraf_obj) private readonly telegraf: Telegraf,
    @Inject(tg_config)
    private readonly tgOpt: TelegramOptionsInterface,
  ) {}
  async sendMessage(
    message: string,
    chatId: string = this.tgOpt.chatId,
  ): Promise<void> {
    await this.telegraf.telegram.sendMessage(chatId, message);
  }
}
