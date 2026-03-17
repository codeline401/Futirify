import CommentSection from "../components/CommentSection";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "@clerk/react";
import { useProductById, useDeleteProduct } from "../hooks/useProduct";
import { useParams, Link, useNavigate } from "react-router";
import {
  ArrowLeftIcon,
  Calendar1Icon,
  EditIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";

function ProductPage() {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const { userId } = useAuth(); // Get the current user's ID from the authentication context
  const navigate = useNavigate(); // Get the navigate function from react-router for programmatic navigation

  const { data: product, isLoading, error } = useProductById(id); // Fetch the product data using the custom hook and the product ID
  const deleteProduct = useDeleteProduct(); // Get the delete product mutation function from the custom hook

  const handleDelete = () => {
    if (confirm("Ho fafana marina ve ity entana ity ?")) {
      deleteProduct.mutate(id, { onSuccess: () => navigate("/") }); // Call the delete product mutation with the product ID and navigate back to the home page on success
    }
  };

  if (isLoading) return <LoadingSpinner />; // Show a loading spinner while the product data is being fetched

  if (error || !product) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Tsy misy entana hita</h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Hiverina
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = userId === product.userId; // Check if the current user is the owner of the product

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="btn btn-ghost btn-sm gap-1">
          <ArrowLeftIcon className="size-4" />
          Hiverina
        </Link>
        {isOwner && (
          <div className="flex gap-2">
            <Link
              to={`/edit/${product.id}`}
              className="btn btn-ghost btn-sm gap-1"
            >
              <EditIcon className="size-4" />
              Hovaina
            </Link>
            <button
              className="btn btn-error btn-sm gap-1"
              onClick={handleDelete}
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <TrashIcon className="size-4" />
              )}
            </button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-2">
        {/**IMAGE  */}
        <div className="card bg-base-300">
          <figure className="p-4">
            <img
              className="rounded-xl w-full h-80 object-cover"
              src={product.imageUrl}
              alt={product.title}
            />
          </figure>
        </div>

        <div className="card bg-base-300">
          <div className="card-body">
            <h1 className="card-title text-2xl">{product.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
              <div className="flex items-center gap-2">
                <Calendar1Icon className="size-4" />
                {new Date(product.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <UserIcon className="size-4" />
                {product.user?.name}
              </div>
            </div>

            <div className="divider my-2"></div>
            <p className="text-base-content/80 leading-relaxed">
              {product.description}
            </p>

            {product.user && (
              <>
                <div className="divider my-2"></div>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={product.user.imageUrl}
                        alt={product.user.name}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{product.user.name}</p>
                    <p className="text-xs text-base-content/50">Mpivarotra</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/** COMMENT SECTION */}
      <div className="card bg-base-300">
        <div className="card-body">
          <CommentSection
            productId={id}
            comments={product.comments}
            currentUserId={userId}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
