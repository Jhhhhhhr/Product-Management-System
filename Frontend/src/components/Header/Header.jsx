import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/user/userSlice';
import { Input } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart"
import "./Header.css";

const { Search } = Input;

export default function Header(props) {
  const { username } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.cart.items);

  const total = (1.1 * items.reduce(
    (acc, curr) => acc + curr.quantity * curr.productID.price,
    0
  )).toFixed(2);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(0);
  }

  return (
    <div className="header">
      <div className="header_title">
        <h2 style={{ color: 'white' }}>Management</h2>
        <p style={{ color: 'white' }}>Chuwa</p>
      </div>
      <Search
        placeholder="Search"
        style={{
          width: 500,
        }}
      />
      <div className="header_userInfo">
        <div>
          <UserOutlined className="header-icon" style={{ color: 'white' }} />
          {username ? (
            <Link style={{ color: 'white' }} to="/" onClick={handleLogout}>Sign Out</Link>
          ) : (
            <Link style={{ color: 'white' }} to="/signin">Sign In</Link>
          )}
        </div>
        <div className="header-shopping-card" onClick={() => setOpen(true)}>
          <ShoppingCartOutlined className="header-icon" style={{ color: 'white' }} />
          <p style={{ color: 'white' }}>${total}</p>
        </div>
        <Cart open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
