import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { uploadToCloudinary } from 'src/common/utils/cloudinary';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 2 * 1024 * 1024 } }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new Error('No file uploaded');

    try {
      const result = await uploadToCloudinary(file.buffer, 'teaVilla');

      return { url: result };
    } catch (error) {
      if (error === 'LIMIT_FILE_SIZE') {
        throw new BadRequestException('File is too large. Max size is 2MB.');
      }
      throw new Error("File Upload Failed")
    }
  }
}
