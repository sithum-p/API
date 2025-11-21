import axiosInstance from "../../lib/axiosInstance";
import type { Product } from "@/types/product";

export const productsAPI = {
  update: async (id: string, product: Partial<Product>) => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    
    return response.json();
  }
};