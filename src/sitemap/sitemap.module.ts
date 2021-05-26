import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { APP_PROVIDERS } from '../app.providers';
import { TopPageModule } from '../top-page/top-page.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TopPageModule, ConfigModule],
  controllers: [SitemapController],
  providers: APP_PROVIDERS,
})
export class SitemapModule {}
