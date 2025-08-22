"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
cloudinary_1.v2.config({
    cloud_name: 'dscsbixa2',
    api_key: '395229328523777',
    api_secret: 'ajrEXCStCcRy8sA6I-hZb-Qa4AQ',
});
const uploadToCloudinary = async (fileBuffer, folder) => {
    const bufferStream = new stream_1.PassThrough();
    bufferStream.end(fileBuffer);
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({ folder }, (error, result) => {
            if (error) {
                reject(error);
            }
            else if (!result) {
                reject(new Error('Upload failed'));
            }
            else {
                resolve(result.secure_url);
            }
        });
        bufferStream.pipe(stream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=cloudinary.js.map