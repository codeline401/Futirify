import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/react";
import { useCreateComment, useDeleteComment } from "../hooks/useCommets";
import {
  LogInIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  SendIcon,
  Trash2Icon,
} from "lucide-react";

function CommentSection({ productId, comments, currentUserId }) {
  comments = comments ?? [];
  const { isSignedIn } = useAuth();
  const [content, setContent] = useState("");
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment(productId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return; // tsy mamela comment banga
    createComment.mutate(
      { productId, content },
      { onSuccess: () => setContent("") },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquareIcon className="size-5 text-primary" />
        <h3 className="font-bold">Comments</h3>
        <span className="badge badge-neutral badge-sm">{comments.length}</span>
      </div>

      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="input input-bordered input-sm flex-1 bg-base-300"
            type="text"
            placeholder="i-commente"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={createComment.isPending}
          />
          <button
            className="btn btn-primary btn-sm btn-square"
            type="submit"
            disabled={createComment.isPending || !content.trim()}
          >
            {createComment.isPending ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <SendIcon className="size-4" />
            )}
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between bg-base-200 rounded-lg p-2">
          <span className="text-sm text-base-content/60">
            Mila mi-connecte vo afaka mametraka commentaire
          </span>
          <SignInButton mode="modal">
            <button className="btn btn-primary btn-sm gap-1">
              <LogInIcon className="size-4" />
              Hiditra
            </button>
          </SignInButton>
        </div>
      )}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-base-content/50">
            <MessageSquareIcon className="size-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Mbola tsy misy commentaire</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-center gap-3 bg-base-200 rounded-lg p-2"
            >
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={comment.user?.imageUrl} alt={comment.user?.name} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">
                    {comment.user?.name}
                  </span>
                  <time className="text-xs opacity-50">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <p className="text-sm truncate">{comment.content}</p>
              </div>

              {currentUserId === comment.userId && (
                <button
                  onClick={() =>
                    confirm("Fafana ?") &&
                    deleteComment.mutate({ commentId: comment.id, productId })
                  }
                  className="btn btn-ghost btn-xs text-error shrink-0"
                  disabled={deleteComment.isPending}
                >
                  {deleteComment.isPending ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    <Trash2Icon className="size-3" />
                  )}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
