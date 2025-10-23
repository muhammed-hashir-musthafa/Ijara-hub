import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import config from "../config/config";
import { Request } from "express";

const s3 = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.aws.s3Bucket,
    key: function (req: Request, file, cb) {
      const timestamp = Date.now();
      const extension = file.originalname.split('.').pop();
      cb(null, `temp/${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export const uploadSingle = upload.single('file');
export const uploadMultiple = upload.array('files', 10);

// Helper function to move file to correct folder
export const moveFileToCorrectFolder = async (oldKey: string, type: string): Promise<string> => {
  const s3Client = new S3Client({
    region: config.aws.region,
    credentials: {
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
    },
  });

  const fileName = oldKey.split('/').pop();
  const newKey = `${type}/${fileName}`;

  // Copy to new location
  await s3Client.send(new (await import('@aws-sdk/client-s3')).CopyObjectCommand({
    Bucket: config.aws.s3Bucket,
    CopySource: `${config.aws.s3Bucket}/${oldKey}`,
    Key: newKey,
  }));

  // Delete old file
  await s3Client.send(new (await import('@aws-sdk/client-s3')).DeleteObjectCommand({
    Bucket: config.aws.s3Bucket,
    Key: oldKey,
  }));

  return newKey;
};
export default upload;