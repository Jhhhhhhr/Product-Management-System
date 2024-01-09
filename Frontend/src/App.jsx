import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthForm from "./components/AuthForm/AuthForm";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import "./App.css";

import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || "");
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  const handleLogin = (usernm, isadmin) => {
    setUsername(usernm);
    setIsAdmin(isadmin);
    localStorage.setItem('username', usernm);
    localStorage.setItem('isAdmin', isadmin.toString());
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
          <Route path="/" element={<Products isAdmin={isAdmin} />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="/signin"
            element={<AuthForm type="signIn" handleLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<AuthForm type="signUp" handleLogin={handleLogin} />}
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
            element={<CreateProduct></CreateProduct>}
          ></Route>
        </Routes>
      </Router>
      <ShoppingCart token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5OGYwZGRiYzI5MzhjYWIyODRlMmJiIn0sImlhdCI6MTcwNDY3Nzc0MywiZXhwIjoxNzA3MjY5NzQzfQ.gKANlzZ0JnlwWQOf1Y3V2qMWXKLADJFsGVi6WYi8O4c" />
      <Footer />
    </>
  );
}

export default App;
