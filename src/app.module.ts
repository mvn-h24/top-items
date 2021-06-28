import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

import { MongoDbConfig } from '@app/config/mongo-db.config';
import { AuthModule } from '@auth/auth.module';
import { TopPageModule } from '@top-page/top-page.module';
import { ProductModule } from '@product/product.module';
import { ReviewModule } from '@review/review.module';
import { FilesModule } from '@files/files.module';
import { SitemapModule } from '@sitemap/sitemap.module';
import { TelegramModule } from '@telegram/telegram.module';

import { APP_PROVIDERS } from './app.providers';
import { TgConfig } from './config/tg.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync(MongoDbConfig),
    TelegramModule.forRootAsync(TgConfig),

    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
    FilesModule,
    SitemapModule,
  ],
  providers: APP_PROVIDERS,
})
export class AppModule {}
