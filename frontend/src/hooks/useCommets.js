import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment } from "../lib/api";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: ["product", variable.productId],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: ["product", variable.productId],
      });
    },
  });
};
