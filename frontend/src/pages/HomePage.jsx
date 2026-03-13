import { useProduct } from "../hooks/useProduct";
import { PackageIcon, SparklesIcon } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const { data: products, isLoading, error } = useProduct();

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="alert alert-error" role="alert">
        <span>Nisy zavatra tsy nilamina. Refresh kely hoe jerena</span>
      </div>
    );
  }
  return (
    <div>
      <Hero />

      {/** Product List  */}
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <PackageIcon className="size-5 text-primary" />
          Ny entana rehetra misy
        </h2>
        {products.length === 0 ? (
          <div className="card bg-base-300">
            <div className="card-body items-center text-center py-16">
              <PackageIcon className="size-10 text-base-content/20" />
              <h3 className="card-title text-base-content">
                Mbola tsy misy entana
              </h3>
              <p className="text-base-content/40 text-sm">
                Avy dia amidio eto raha misy entana amidy any
              </p>
              <Link to="/create" className="btn btn-primary btn-sm mt-4">
                Hivarotra entana
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
