import axiosInstance from "@/lib/axiosInstance";
import { Product } from "@/types/product";

export async function getProducts(
  page = 1,
  limit = 10
): Promise<{ data: Product[]; total: number }> {
  const skip = (page - 1) * limit;

  const res = await axiosInstance.get(`/api/products?limit=${limit}&skip=${skip}`);
  
  console.log('API Response:', res.data);
  
  // Handle both array and object responses
  if (Array.isArray(res.data)) {
    return {
      data: res.data,
      total: res.data.length
    };
  }
  
  return {
    data: res.data.data || [],
    total: res.data.total || 0
  };
}
