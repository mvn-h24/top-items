import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { FilesConfig } from '@app/config/files.config';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [ServeStaticModule.forRoot(FilesConfig)],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
