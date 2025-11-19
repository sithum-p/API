import axiosInstance from "@/lib/axiosInstance";
import { Product } from "@/types/product";

export async function getProducts(
  page = 1,
  limit = 20
): Promise<{ data: Product[]; total: number; pagination?: any }> {
  try {
    console.log(`Fetching products: page ${page}, limit ${limit}`);
    
    const response = await axiosInstance.get(`/api/products`, {
      params: {
        page: page,
        limit: limit
      }
    });
    
    console.log('Pagination Response:', response.data);
    
    if (response.data.success) {
      return {
        data: response.data.data || [],
        total: response.data.total || 0,
        pagination: response.data.pagination
      };
    } else {
      throw new Error('Failed to fetch products');
    }
    
  } catch (error) {
    console.error('Product API Error:', error);
    return {
      data: [],
      total: 0
    };
  }
}
