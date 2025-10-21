import { Request, Response } from "express";
import s3Service from "../service/s3Service";
import { successResponse, errorResponse } from "../utils/responseHandler";
import { moveFileToCorrectFolder } from "../middleware/upload";
import config from "../config/config";

interface S3File extends Express.Multer.File {
  location: string;
  key: string;
  bucket: string;
}

export const uploadSingle = async (req: Request, res: Response) => {
  try {
    const { type } = req.body;
    const file = req.file as S3File;
    
    if (!file) {
      return errorResponse(res, 400, "No file uploaded");
    }

    if (!type || !['rooms', 'cars', 'profiles'].includes(type)) {
      // Delete the uploaded file since type is invalid
      await s3Service.deleteFile(file.key);
      return errorResponse(res, 400, "Invalid or missing type. Must be: rooms, cars, or profiles");
    }

    // Move file to correct folder
    const newKey = await moveFileToCorrectFolder(file.key, type);
    const newUrl = `https://${config.aws.s3Bucket}.s3.${config.aws.region}.amazonaws.com/${newKey}`;

    return successResponse(res, "File uploaded successfully", {
      url: newUrl,
      key: newKey,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return errorResponse(res, 500, "Upload failed", error);
  }
};

export const uploadMultiple = async (req: Request, res: Response) => {
  try {
    const { type } = req.body;
    const files = req.files as S3File[];
    
    if (!files || files.length === 0) {
      return errorResponse(res, 400, "No files uploaded");
    }

    if (!type || !['rooms', 'cars', 'profiles'].includes(type)) {
      // Delete all uploaded files since type is invalid
      for (const file of files) {
        await s3Service.deleteFile(file.key);
      }
      return errorResponse(res, 400, "Invalid or missing type. Must be: rooms, cars, or profiles");
    }

    // Move all files to correct folder
    const uploadedFiles = [];
    for (const file of files) {
      const newKey = await moveFileToCorrectFolder(file.key, type);
      const newUrl = `https://${config.aws.s3Bucket}.s3.${config.aws.region}.amazonaws.com/${newKey}`;
      uploadedFiles.push({ url: newUrl, key: newKey });
    }

    return successResponse(res, "Files uploaded successfully", {
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return errorResponse(res, 500, "Upload failed", error);
  }
};

export const getFileUrl = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    
    if (!key) {
      return errorResponse(res, 400, "File key is required");
    }

    const decodedKey = decodeURIComponent(key);
    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${decodedKey}`;
    
    return successResponse(res, "File URL retrieved successfully", {
      url,
      key: decodedKey,
    });
  } catch (error) {
    console.error("Get URL error:", error);
    return errorResponse(res, 500, "Failed to get file URL", error);
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    
    if (!key) {
      return errorResponse(res, 400, "File key is required");
    }

    await s3Service.deleteFile(key);
    return successResponse(res, "File deleted successfully");
  } catch (error) {
    console.error("Delete error:", error);
    return errorResponse(res, 500, "Failed to delete file", error);
  }
};