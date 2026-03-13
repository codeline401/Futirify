import { Link } from "react-router";
import {
  ShoppingBagIcon,
  SparklesIcon,
  PackageIcon,
  LucideShoppingBag,
} from "lucide-react";
import { SignInButton, useAuth } from "@clerk/react";

function Hero() {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Badge */}
      <div className="badge badge-primary badge-outline gap-2 mb-6 p-4 text-sm font-medium">
        <SparklesIcon className="size-4" />
        <span className="text-rotate text-xl">
          <span className="justify-items-center">
            <span>Jereo ato ireo entana mety aminao</span>
            <span>Amidio ato ireo entana tsy ilainao intsony</span>
          </span>
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
        Tongasoa eto amin'ny{" "}
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Brokatera
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 max-w-xl text-base-content/70 text-lg">
        Amidio ireo entana tsy ilainao intsony, Jereo ireo entant mety aminao.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        {isSignedIn ? (
          <Link to="/create" className="btn btn-primary btn-lg gap-2">
            <PackageIcon className="size-5" />
            Hivarotra entana
          </Link>
        ) : (
          <SignInButton mode="modal" className="btn btn-primary btn-lg gap-2">
            <button className="btn btn-primary size-3">
              <LucideShoppingBag className="size-3" />
              Hividy entana
            </button>
          </SignInButton>
        )}
      </div>

      {/* Decorative divider */}
      <div className="divider mt-12 max-w-md mx-auto">
        <PackageIcon className="size-5 text-primary" />
      </div>
    </div>
  );
}

export default Hero;
