import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useAuth } from "@clerk/react";
import { useEditProduct, useProductById } from "../hooks/useProduct";
import LoadingSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";

function EditPage() {
  const { id } = useParams();
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading } = useProductById(id);
  const updateProduct = useEditProduct();

  if (isLoading || !isLoaded) return <LoadingSpinner />;

  if (!product || product.userId !== userId) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">
            {!product
              ? "Tsy hita io entana io"
              : "Tsy manana alalana hanova io entana io ianao!!!"}
          </h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Hiverina hijery entana hafa
          </Link>
        </div>
      </div>
    );
  }

  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData) => {
        updateProduct.mutate(
          { id, ...formData },
          { onSuccess: () => navigate(`/product/${id}`) },
        );
      }}
    />
  );
}

export default EditPage;
