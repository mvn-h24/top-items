import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_PROVIDERS } from '@app/app.providers';
import { TopPageModule } from '@top-page/top-page.module';

import { SitemapController } from './sitemap.controller';

@Module({
  imports: [TopPageModule, ConfigModule],
  controllers: [SitemapController],
  providers: APP_PROVIDERS,
})
export class SitemapModule {}
