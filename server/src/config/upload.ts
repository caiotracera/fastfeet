import { randomBytes } from 'crypto';
import multer, { StorageEngine } from 'multer';
import { resolve } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    aws: {
      bucket: process.env.STORAGE_BUCKET,
    },
  },
} as IUploadConfig;
