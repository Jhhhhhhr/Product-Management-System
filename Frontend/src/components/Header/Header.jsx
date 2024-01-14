import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import { Input, Badge } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart";
import "./Header.css";

const { Search } = Input;

export default function Header() {
  const { username } = useSelector((state) => state.user.info);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth < 440);
  const cartItems = useSelector((state) => state.cart.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(0);
  };

  const countItemsInCart = () => {
    const sum = cartItems.reduce((pre, cur) => { pre += cur.quantity; return pre; }, 0);
    return sum;
  }

  return (
    <div className="header">
      <div className="header-info">
        <div
          className="header_title"
          onClick={() => {
            navigate("/");
          }}
        >
          <h2 className="responsive-mchuwa" style={{ color: "white" }}>{isNarrowScreen ? "M" : "Management"}</h2>
          <p style={{ color: "white" }}>Chuwa</p>
        </div>
        {!isNarrowScreen &&
          <Search
            placeholder="Search"
            style={{
              width: 500,
            }}
          />
        }
        <div className="header_userInfo">
          <div>
            <UserOutlined className="header-icon" style={{ color: "white" }} />
            {username ? (
              <Link style={{ color: "white" }} to="/" onClick={handleLogout}>
                Sign Out
              </Link>
            ) : (
              <Link style={{ color: "white" }} to="/signin">
                Sign In
              </Link>
            )}
          </div>
          <div className="header-shopping-card" onClick={() => setOpen(true)}>
            <Badge count={countItemsInCart()} size="small" offset={[-5, 0]}>
              <ShoppingCartOutlined
                className="header-icon"
                style={{ color: "white" }}
              />
            </Badge>
            <p style={{ color: "white" }}>${total}</p>
          </div>
          <Cart open={open} setOpen={setOpen} setTotal={setTotal} />
        </div>
      </div>
      <div className="header-searcher">
        {isNarrowScreen &&
          <Search
            placeholder="Search"
            style={{
              width: '85%',
            }}
          />
        }
      </div>
    </div>
  );
}
