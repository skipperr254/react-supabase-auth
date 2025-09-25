import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // While we are still determining auth status, we can render a loading indicator
  if (loading) {
    return <div>Loading...</div>; // or spinner etc.
  }

  if (!user) {
    // If not logged in, redirect to login, maybe store where the user was going to redirect back after login
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  // If user is logged in, render the requested route's component(s)
  return <Outlet />;
};

export default ProtectedRoute;
