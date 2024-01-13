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

function App() {
  const dispatch = useDispatch();
  const {username, isAdmin, token} = useSelector(state=>state.user.info);  

  useEffect(()=> {
    if(token) {
      console.log("Fetch cart!");
      dispatch(fetchCart(token));
    }
  }, [token, dispatch]);

  return (
    <>
      <Router>
        <Header username={username} />
        <Routes>
          <Route path="/" element={<Products isAdmin={isAdmin} username={username} />} />
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
          <Route
            path="/create-product"
            element={<ManageProduct></ManageProduct>}
          ></Route>
          <Route
            path="/edit-product/:productId"
            element={<ManageProduct></ManageProduct>}
          ></Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
