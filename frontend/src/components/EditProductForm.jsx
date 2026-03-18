import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SaveIcon,
  TypeIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

function EditProductForm({ product, isPending, isError, onSubmit }) {
  const [formData, setFormData] = useState({
    // Initialize form data with product details
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
  });

  return (
    <div className="max-w-lg mx-auto">
      <Link to="/profile" className="size-4">
        <ArrowLeftIcon className="size-4" />
        Hiverina
      </Link>

      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">
            <SaveIcon className="size-4" />
            Hanova ilay entana
          </h1>

          <form
            className="space-y-4 mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
          >
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <TypeIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Anaran'ny entana"
                className="grow"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <ImageIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Rohin'ny sary"
                className="grow"
                value={formData.imageUrl}
                onChange={(e) => {
                  setFormData({ ...formData, imageUrl: e.target.value });
                }}
                required
              />
            </label>

            {formData.imageUrl && (
              <div className="rounded-box overflow-hidden">
                <img
                  className="w-full h-50 object-cover"
                  src={formData.imageUrl}
                  alt="Preview"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            )}

            <div className="form-control">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-4" />
                <textarea
                  placeholder="Mombamoman'ny entana"
                  className="grow bg-transparent resize-none focus:outline-none min-h-2"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {isError && (
              <div className="alert alert-error alert-sm" role="alert">
                <span>
                  Nisy zavatra tsy nety tamin'ny fanovana, andramo indray hoe.
                </span>
              </div>
            )}

            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                "Ovaina"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProductForm;
