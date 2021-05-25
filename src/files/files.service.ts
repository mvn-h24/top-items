import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';
import { path } from 'app-root-path';

@Injectable()
export class FilesService {
  get uploadFolder(): string {
    return format(new Date(), 'yyyy-MM-dd');
  }
  get uploadFolderUrl(): string {
    return `/uploads/${this.uploadFolder}`;
  }
  async UploadsPath(): Promise<string> {
    const r = `${path}${this.uploadFolderUrl}`;
    await ensureDir(r);
    return r;
  }

  async saveFiles(
    files: Express.Multer.File[],
  ): Promise<FileElementResponse[]> {
    const uploadFolder = await this.UploadsPath();
    const filesResponse: Array<FileElementResponse> = [];
    for (const file of files) {
      const uploadedFile = `${uploadFolder}/${file.originalname}`;
      await writeFile(uploadedFile, file.buffer);
      filesResponse.push({
        url: `${this.uploadFolderUrl}/${file.originalname}`,
        name: file.originalname,
      });
    }
    return filesResponse;
  }
}
