import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import config from "../config/config";

class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.s3Client = new S3Client({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
    });
    this.bucketName = config.aws.s3Bucket;
  }



  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.s3Client.send(command);
  }


}

export default new S3Service();