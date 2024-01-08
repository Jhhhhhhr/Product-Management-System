import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AuthForm from './components/AuthForm/AuthForm';
import Products from './pages/Products/Products';
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import './App.css'

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
        <Header username={username} handleSignout={handleSignout}/>
        <Routes>
          <Route path="/" element={<Products isAdmin={isAdmin}/>} />
          <Route path="/signin" element={<AuthForm type="signIn" handleLogin={handleLogin} />} />
          <Route path="/signup" element={<AuthForm type="signUp" handleLogin={handleLogin} />} />
          <Route path="/update-password" element={<AuthForm type="updatePassword" />} />
          <Route path="/reset-password/:token" element={<AuthForm type="resetPassword" />} />
          <Route path="/product" element={<ProductDetail></ProductDetail>}></Route>
          <Route path="/create-product" element={<CreateProduct></CreateProduct>}></Route>
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
