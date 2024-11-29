import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Sharp from 'sharp'
import { getFileExtension, randomSeries } from 'yancey-js-util'

import {
  AZURE_STORAGE_CONTAINER_NAME,
  AZURE_STORAGE_URL,
  BASE_IMAGE_EXTENSIONS
} from '../shared/constants'

@Injectable()
export class UploaderService {
  private readonly containerClient: ContainerClient

  constructor(configService: ConfigService) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      configService.get<string>('AZURE_STORAGE_CONNECTION_STRING')
    )

    this.containerClient = blobServiceClient.getContainerClient(
      AZURE_STORAGE_CONTAINER_NAME
    )
  }

  private async convertImageToWebp(image: Buffer) {
    try {
      const buffer = await Sharp(image, { animated: true })
        .webp({ quality: 80 })
        .toBuffer()

      return buffer
    } catch (e) {
      throw new BadRequestException('Failed to convert to webp format.')
    }
  }

  private async uploadToAzureBlob(
    fileName: string,
    extension: string,
    buffer: Buffer
  ) {
    const blockBlobClient = this.containerClient.getBlockBlobClient(
      `${fileName}.${extension}`
    )
    const { errorCode } = await blockBlobClient.upload(
      buffer,
      Buffer.byteLength(buffer)
    )

    if (errorCode) {
      throw new BadRequestException(errorCode)
    }
  }

  public async uploadFile(file: Express.Multer.File) {
    const { originalname, buffer } = file
    const hash = `${randomSeries(8)}-${+new Date()}`
    const extension = getFileExtension(originalname)

    if (BASE_IMAGE_EXTENSIONS.includes(extension.toLowerCase())) {
      const webpBuffer = await this.convertImageToWebp(buffer)
      await this.uploadToAzureBlob(hash, 'webp', webpBuffer)
    }

    await this.uploadToAzureBlob(hash, extension, buffer)

    return {
      name: originalname,
      url: `${AZURE_STORAGE_URL}/${AZURE_STORAGE_CONTAINER_NAME}/${hash}.${extension}`
    }
  }
}
