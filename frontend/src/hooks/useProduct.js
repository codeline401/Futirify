import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllProduct, createProduct } from "../lib/api";

export const useProduct = () => {
  const result = useQuery({ queryKey: ["products"], queryFn: getAllProduct });
  return result;
};

export const useCreateProduct = () => {
  const result = useMutation({ mutationFn: createProduct });
  return result;
};
