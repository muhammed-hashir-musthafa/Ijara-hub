'use client';

import { useCallback, useState } from 'react';
import { useUpload } from '@/hooks/useUpload';
import { UploadResponse } from '@/lib/upload';
import Image from 'next/image';

interface FileUploadProps {
  type: 'rooms' | 'cars' | 'profiles';
  multiple?: boolean;
  onUploadComplete: (urls: string[]) => void;
  onUploadError?: (error: string) => void;
  className?: string;
}

export default function FileUpload({
  type,
  multiple = false,
  onUploadComplete,
  onUploadError,
  className = '',
}: FileUploadProps) {
  const { uploading, progress, uploadSingle, uploadMultiple } = useUpload();
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    const newPreviews = fileArray.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);

    try {
      if (multiple) {
        const result = await uploadMultiple(fileArray, type);
        onUploadComplete(result.map((f: UploadResponse) => f.url));
      } else {
        const result = await uploadSingle(fileArray[0], type);
        onUploadComplete([result.url]);
      }
    } catch (error) {
      onUploadError?.(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      newPreviews.forEach(URL.revokeObjectURL);
      setPreviews([]);
    }
  }, [multiple, uploadMultiple, uploadSingle, type, onUploadComplete, onUploadError]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="file-upload"
          disabled={uploading}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          {uploading ? (
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Uploading... {progress}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-lg text-gray-600">
                {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
              </div>
              <div className="text-sm text-gray-500">
                or click to select {multiple ? 'files' : 'a file'}
              </div>
              <div className="text-xs text-gray-400">
                Supports: JPEG, PNG, WebP (max 5MB)
              </div>
            </div>
          )}
        </label>
      </div>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          {previews.map((preview, index) => (
            <Image
              width={100}
              height={80}
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-20 object-cover rounded border"
            />
          ))}
        </div>
      )}
    </div>
  );
}