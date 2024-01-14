import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchOneProductInfo } from "../../services/product";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  const { isAdmin, token } = useSelector((state) => state.user.info);
  const { productId } = useParams();
  const location = useLocation();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchOneProductInfo(productId)
        .then((data) => {
          const decoded = jwtDecode(token);
          if (data.owner === decoded.user.id) {
            setIsOwner(true);
          }
        })
        .catch((error) => console.error("Error fetching data: ", error));
    }
  }, []);

  return (
    <>
      {isAdmin ? (
        productId ? (
          isOwner ? (
            <Outlet />
          ) : (
            <Navigate to={`/product/${productId}`} state={{ from: location.pathname, message:"You are not the owner of this product!" }}></Navigate>
          )
        ) : (
          <Outlet />
        )
      ) : (
        <Navigate to="/" state={{ from: location.pathname, message:"You have no permission to create product!" }}></Navigate>
      )}
    </>
  );
}
