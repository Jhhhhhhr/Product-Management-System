import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AuthForm from './components/AuthForm/AuthForm';
import Products from './pages/Products/Products';
import './App.css'

function App() {
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (usernm, isadmin) => {
    setUsername(usernm);
    setIsAdmin(isadmin);
  };

  const handleSignout = () => {
    setUsername("");
    setIsAdmin(false);
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
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
