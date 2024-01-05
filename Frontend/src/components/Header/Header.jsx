import "./Header.css";
import { Input } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function Header() {
  return (
    <div className="header">
      <div className="header_title">
        <h2 style={{color:'white'}}>Management</h2>
        <p style={{color:'white'}}>Chuwa</p>
      </div>
      <Search
        placeholder="Search"
        style={{
          width: 500,
        }}
      />
      <div className="header_userInfo">
        <UserOutlined style={{color:'white'}}/>
        <p style={{color:'white'}}>Sign In</p>
        <ShoppingCartOutlined style={{color:'white'}}/>
        <p style={{color:'white'}}>$0.00</p>
      </div>
    </div>
  );
}
