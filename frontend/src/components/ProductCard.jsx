import { Link } from "react-router";
import { CalendarIcon, MessageCircleIcon, UserIcon } from "lucide-react";

function ProductCard({ product }) {
  const formattedDate = new Date(product.createdAt).toLocaleDateString(
    "fr-FR",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <Link
      to={`/product/${product.id}`}
      className="card bg-base-300 shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* Product Image */}
      <figure className="aspect-video overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </figure>

      <div className="card-body p-4 gap-2">
        {/* Title */}
        <h3 className="card-title text-base line-clamp-1">{product.title}</h3>

        {/* Description */}
        <p className="text-sm text-base-content/60 line-clamp-2">
          {product.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 text-xs text-base-content/50">
          <span className="flex items-center gap-1">
            <CalendarIcon className="size-3" />
            {formattedDate}
          </span>
          {product.commentCount !== undefined && (
            <span className="flex items-center gap-1">
              <MessageCircleIcon className="size-3" />
              {product.commentCount}
            </span>
          )}
        </div>

        {/* Seller */}
        {product.user?.name && (
          <>
            <div className="divider my-1"></div>
            <div className="flex items-center gap-1 text-xs text-base-content/50">
              <UserIcon className="size-3" />
              <span>{product.user.name}</span>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
