import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { FILE_SIZE_LIMIT } from '../shared/constants'
import { AzureBlobResponse } from './interfaces/azure-blob-response'
import { UploaderService } from './uploader.service'

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
