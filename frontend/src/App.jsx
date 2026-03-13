import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilPage from "./pages/ProfilPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";

function App() {
  const { isClerkLoaded, isSignedIn } = useAuthReq(); // Call the custom hook to set up authentication and token management for API requests
  useUserSync(); // Call the custom hook to synchronize user data with the backend API when the user is signed in

  if (!isClerkLoaded) return null; // Wait until Clerk has finished loading the user data before rendering the app to ensure that the authentication status is accurate

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilPage />} />
          <Route
            path="/create"
            element={isSignedIn ? <CreatePage /> : <Navigate to="/" />}
          />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
