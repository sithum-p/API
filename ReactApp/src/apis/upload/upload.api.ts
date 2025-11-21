import axiosInstance from "../../lib/axiosInstance";

export const uploadAPI = {
  uploadImage: async (file: File): Promise<{ imageUrl: string; publicId: string }> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await axiosInstance.post('/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
};