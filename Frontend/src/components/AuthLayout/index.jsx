import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const { isAdmin } = useSelector((state) => state.user.info);
  const location = useLocation();

  return (
    <>
      {isAdmin ? <Outlet/>: (
        <Navigate to="/" state={{ from: location.pathname, message:"You have no permission to manage product!" }}></Navigate>
      )}
    </>
  );
}
