import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { UploaderService } from './uploader.service'
import { AzureBlobResponse } from './interfaces/azure-blob-response'

@Controller()
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post('uploadSingleFile')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fieldSize: 10 * 1024 * 1024 } }),
  )
  public async uploadSingleFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AzureBlobResponse> {
    return await this.uploaderService.uploadFile(file)
  }
}
