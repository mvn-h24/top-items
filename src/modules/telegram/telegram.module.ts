import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { TelegramService } from './telegram.service';
import { ITgModuleAsyncOpt } from './telegram-options.interface';
import { TELEGRAM_MODULE_OPTS } from './telegram.constants';

@Global()
@Module({})
export class TelegramModule {
  static forRootAsync(opts: ITgModuleAsyncOpt): DynamicModule {
    const moduleOpts = this.createAsyncOptsProvider(opts);
    return {
      module: TelegramModule,
      imports: opts.imports,
      providers: [TelegramService, moduleOpts],
      exports: [TelegramService],
    };
  }

  private static createAsyncOptsProvider(opts: ITgModuleAsyncOpt): Provider {
    return {
      provide: TELEGRAM_MODULE_OPTS,
      useFactory: async (...args: any[]) => {
        return opts.useFactory(...args);
      },
      inject: opts.inject || [],
    };
  }
}
