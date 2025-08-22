import { v2 as cloudinary } from 'cloudinary';
import { PassThrough } from 'stream';

cloudinary.config({
  cloud_name: 'dscsbixa2',
  api_key: '395229328523777',
  api_secret: 'ajrEXCStCcRy8sA6I-hZb-Qa4AQ',
});

export const uploadToCloudinary = async (fileBuffer: Buffer,folder: string): Promise<string> => {
  const bufferStream = new PassThrough();
  bufferStream.end(fileBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (!result) {
          reject(new Error('Upload failed'));
        } else {
          resolve(result.secure_url); // ✅ only secure_url returned
        }
      },
    );

    bufferStream.pipe(stream); // fileBuffer is piped to Cloudinary stream
  });
};