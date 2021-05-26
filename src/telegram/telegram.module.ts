import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TG_PROVIDERS } from './telegram.proviers';
import { ConfigModule } from '@nestjs/config';

@Module({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  providers: [TelegramService].concat(TG_PROVIDERS),
  imports: [ConfigModule],
  exports: [TelegramService],
})
export class TelegramModule {}
