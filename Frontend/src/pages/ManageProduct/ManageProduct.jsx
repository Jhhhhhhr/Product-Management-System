import "./ManageProduct.css";
import { Input, Dropdown, Button, Space, Empty } from "antd";
import { useParams } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import blankImage from "../../assets/bi_file-earmark-image.png";
const { TextArea } = Input;

export default function ManageProduct() {
  const { productId } = useParams();

  const categories = [
    {
      key: "0",
      label: "Category1",
    },
    {
      key: "1",
      label: "Category2",
    },
    {
      key: "2",
      label: "Category3",
    },
    {
      key: "3",
      label: "Others",
    },
  ];

  return (
    <div id="content">
      <h4
        style={{
          marginLeft: "20%",
          marginBottom:"1em",
          fontFamily: "Inter",
          fontSize: "32px",
          fontWeight: "700",
          letterSpacing: "0px",
        }}
      >
        Create/Edit Product
      </h4>
      <div className="create_product_info_container">
        <p className="create_product_label">Product name</p>
        <Input className="create_product_input"></Input>
        <p className="create_product_label">Product description</p>
        <TextArea style={{ fontSize: "24px" }} rows={4}></TextArea>
        <div className="create_product_group">
          <div style={{ flex: "1" }}>
            <p className="create_product_label">Category</p>
            <Dropdown menu={{ items: categories }} trigger={["click"]}>
              <Button
                style={{ width: "100%", height: "56px", fontSize: "24px" }}
              >
                Choose Category
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div style={{ flex: "1" }}>
            <p className="create_product_label">Price</p>
            <Input className="create_product_input" placeholder="0"></Input>
          </div>
        </div>
        <div className="create_product_group">
          <div style={{ flex: "1" }}>
            <p className="create_product_label">In Stock Quantity</p>
            <Input className="create_product_input" placeholder="1"></Input>
          </div>
          <div style={{ flex: "3" }}>
            <p className="create_product_label">Add Image Link</p>
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Input className="create_product_input"></Input>
              <Button
                type="primary"
                style={{ height: "56px", backgroundColor: "#5048E5" }}
              >
                Upload
              </Button>
            </Space.Compact>
          </div>
        </div>
        <div className="create_product_img_preview">
          <Empty
            image={blankImage}
            imageStyle={{
              height: 60,
            }}
            description={<span style={{fontFamily:"Inter", fontSize:"16px", color:"#6B7280"}}>Image Preview!</span>}
          ></Empty>
        </div>
        <Button
          type="primary"
          style={{ height: "40px", backgroundColor: "#5048E5" }}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
}