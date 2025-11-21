import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadAPI } from '@/apis/upload/upload.api';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

export default function ImageUpload({ onImageUpload, currentImage, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadAPI.uploadImage(file);
      setPreview(result.imageUrl);
      onImageUpload(result.imageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUpload('');
  };

  return (
    <div className={`relative ${className}`}>
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded-lg border" />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">Click to upload image</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </label>
      )}
      {uploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="text-white">Uploading...</div>
        </div>
      )}
    </div>
  );
}