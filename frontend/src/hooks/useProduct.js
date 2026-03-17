import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getAllProduct,
  createProduct,
  getProductById,
  deleteProduct,
  getMyProducts,
} from "../lib/api";

export const useProduct = () => {
  const result = useQuery({ queryKey: ["products"], queryFn: getAllProduct });
  return result;
};

export const useCreateProduct = () => {
  const result = useMutation({ mutationFn: createProduct });
  return result;
};

export const useProductById = (id) => {
  const result = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id, // Only run the query if an ID is provided
  });
  return result;
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
  });
};

export const useMyProducts = () => {
  return useQuery({
    queryKey: ["myProducts"], //
    queryFn: getMyProducts,
  });
};
