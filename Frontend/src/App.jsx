import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthForm from "./pages/AuthForm/AuthForm";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ManageProduct from "./pages/ManageProduct/ManageProduct";
import "./App.css";

// import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || "");
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  const handleLogin = (usernm, isadmin, token) => {
    setUsername(usernm);
    setIsAdmin(isadmin);
    localStorage.setItem('username', usernm);
    localStorage.setItem('isAdmin', isadmin.toString());
    localStorage.setItem('token', token);
  };

  const handleSignout = () => {
    setUsername("");
    setIsAdmin(false);
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
  };

  return (
    <>
      <Router>
        <Header username={username} handleSignout={handleSignout} />
        <Routes>
          <Route path="/" element={<Products isAdmin={isAdmin} username={username} />} />
          <Route
            path="/signin"
            element={<AuthForm type="signIn" handleLogin={handleLogin} />}
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
      {/* <ShoppingCart token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5OGYwZGRiYzI5MzhjYWIyODRlMmJiIn0sImlhdCI6MTcwNDY3Nzc0MywiZXhwIjoxNzA3MjY5NzQzfQ.gKANlzZ0JnlwWQOf1Y3V2qMWXKLADJFsGVi6WYi8O4c" /> */}
      <Footer />
    </>
  );
}

export default App;
