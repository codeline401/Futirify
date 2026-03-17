import React from "react";
import { Link, useNavigate } from "react-router";
import { useDeleteProduct, useMyProducts } from "../hooks/useProduct";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  DeleteIcon,
  EditIcon,
  EyeIcon,
  PackageIcon,
  PlusIcon,
} from "lucide-react";

function ProfilPage() {
  const navigate = useNavigate();
  const { data: product, isLoading } = useMyProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id) => {
    if (confirm("Fafana io entana io ?")) deleteProduct.mutate(id);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ireo entako rehetra</h1>
          <p className="text-base-content/60 text-sm">Alamino ireo entanao</p>
        </div>

        <Link to="/create" className="btn btn-primary btn-sm gap-1">
          <PlusIcon className="size-3" />
          Ampiditra
        </Link>
      </div>

      {/**STATS */}
      <div className="stats bg-base-300 w-full">
        <div className="stat">
          <div className="stat-title">Totalin'ny entana</div>
          <div className="stat-value text-primary">{product?.length || 0}</div>
        </div>
      </div>

      {/**PRODUCT */}
      {product.length === 0 ? (
        <div className="card bg-base-300">
          <div className="card-body items-center text-center py-16">
            <PackageIcon className="size-4" />
            <h3 className="card-title text-base-content/50">
              Mbola tsy manana entana ianao
            </h3>
            <p className="text-base-content/40 text-sm">
              Aza misalasala mampiditre entana
            </p>
            <Link to="/create" className="btn btn-primary btn-sm mt-4">
              Hampiditra entana
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {product.map((prod) => (
            <div className="card card-side bg-base-300">
              <figure className="w-32 shrink-0">
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  className="h-full object-cover"
                />
              </figure>

              <div className="card-body p-4">
                <h2 className="card-title text-base">{prod.title}</h2>
                <p className="text-sm text-base-content/60 line-clamp-1">
                  {prod.description}
                </p>

                <div className="card-actions justify-end mt-2">
                  <button
                    className="btn btn-ghost btn-xs gap-1"
                    onClick={() => navigate(`/product/${prod.id}`)}
                  >
                    <EyeIcon className="size-3" /> Jerena
                  </button>
                  <button
                    className="btn btn-ghost btn-xs gap-1"
                    onClick={() => navigate(`/edit/${prod.id}`)}
                  >
                    <EditIcon className="size-3" /> Hovaina
                  </button>

                  <button
                    className="btn btn-ghost btn-xs gap-1"
                    onClick={() => handleDelete(prod.id)}
                  >
                    <DeleteIcon className="size-3" /> Fafàna
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilPage;
