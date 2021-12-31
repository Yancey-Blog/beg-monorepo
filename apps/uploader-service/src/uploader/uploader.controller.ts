import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { UploaderService } from './uploader.service'
import { AzureBlobResponse } from './interfaces/azure-blob-response'
import { FILE_SIZE_LIMIT } from '../shared/constants'

@Controller()
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post('uploadSingleFile')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fieldSize: FILE_SIZE_LIMIT } })
  )
  public async uploadSingleFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<AzureBlobResponse> {
    return await this.uploaderService.uploadFile(file)
  }
}
