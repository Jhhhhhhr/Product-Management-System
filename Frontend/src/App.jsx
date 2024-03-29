import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthForm from "./pages/AuthForm/AuthForm";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ManageProduct from "./pages/ManageProduct/ManageProduct";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./features/cart/cartSlice";
import AuthLayout from "./components/AuthLayout";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector(state=>state.user.info);  

  useEffect(()=> {
    if(token) {
      console.log("Fetch cart!");
      dispatch(fetchCart(token));
    }
  }, [token, dispatch]);

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Products/>} />
          <Route
            path="/signin"
            element={<AuthForm type="signIn" />}
          />
          <Route
            path="/signup"
            element={<AuthForm type="signUp" />}
          />
          <Route
            path="/update-password"
            element={<AuthForm type="updatePassword" />}
          />
          <Route
            path="/reset-password/:token"
            element={<AuthForm type="resetPassword" />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetail></ProductDetail>}
          ></Route>
          <Route element={<AuthLayout></AuthLayout>}>
            <Route
              path="/create-product"
              element={<ManageProduct></ManageProduct>}
            ></Route>
            <Route
              path="/edit-product/:productId"
              element={<ManageProduct></ManageProduct>}
            ></Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
