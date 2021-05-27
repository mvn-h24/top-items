import { DynamicModule, ModuleMetadata } from '@nestjs/common';

export interface TelegramOptionsInterface {
  token: string;
  chatId: string;
}

export interface ITgModuleAsyncOpt extends Pick<ModuleMetadata, 'imports'> {
  useFactory(
    ...args
  ): Promise<TelegramOptionsInterface> | TelegramOptionsInterface;
  inject?: any[];
}
