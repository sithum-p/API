import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/apis/products/product.api";

export function useProductsQuery(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["products", page, pageSize],
    queryFn: () => getProducts(page, pageSize),
    onError: (error) => console.error('Query error:', error),
    onSuccess: (data) => console.log('Query success:', data)
  });
}
