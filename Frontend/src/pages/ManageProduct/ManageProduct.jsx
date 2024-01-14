import "./ManageProduct.css";
import { Input, Dropdown, Button, Space, Empty } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import blankImage from "../../assets/bi_file-earmark-image.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  fetchOneProductInfo,
} from "../../services/product";
const { TextArea } = Input;

export default function ManageProduct() {
  const { productId } = useParams();
  const { token } = useSelector((state) => state.user.info);
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    price: null,
    quantity: null,
    category: "Choose Category",
    imgURL: null,
  });

  const [previewImgURL, setPreviewImgURL] = useState();

  useEffect(() => {
    if (productId) {
      fetchOneProductInfo(productId)
        .then((data) => {
          setProductInfo({
            name: data.name,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            category: data.category,
            imgURL: data.imgURL,
          });
          setPreviewImgURL(data.imgURL);
        })
        .catch((error) => console.error("Error fetching data: ", error));
    }
  }, []);

  const categories = [
    {
      key: "0",
      label: "Sport",
    },
    {
      key: "1",
      label: "Eletronics",
    },
    {
      key: "2",
      label: "Apparel",
    },
    {
      key: "3",
      label: "Others",
    },
  ];

  const handleSubmit = () => {
    if (productId) {
      updateProduct(token, productId, productInfo);
    } else {
      createProduct(token, productInfo);
    }
    navigate("/");
  };

  const handleChooseCategory = ({ key }) => {
    let selectedCategory = categories.find((item) => item.key === key).label;
    setProductInfo((pre) => ({ ...pre, category: selectedCategory }));
  };

  return (
    <div id="content">
      <h4
        style={{
          marginLeft: "20%",
          marginBottom: "1em",
          fontFamily: "Inter",
          fontSize: "32px",
          fontWeight: "700",
          letterSpacing: "0px",
        }}
      >
        {productId ? "Edit Product" : "Create Product"}
      </h4>
      <div className="create_product_info_container">
        <p className="create_product_label">Product name</p>
        <Input
          className="create_product_input"
          value={productInfo.name}
          onChange={(e) => {
            setProductInfo((pre) => ({ ...pre, name: e.target.value }));
          }}
        ></Input>
        <p className="create_product_label">Product description</p>
        <TextArea
          style={{ fontSize: "24px" }}
          rows={4}
          value={productInfo.description}
          onChange={(e) => {
            setProductInfo((pre) => ({ ...pre, description: e.target.value }));
          }}
        ></TextArea>
        <div className="create_product_group">
          <div style={{ flex: "1" }}>
            <p className="create_product_label">Category</p>
            <Dropdown
              menu={{ items: categories, onClick: handleChooseCategory }}
              trigger={["click"]}
            >
              <Button
                style={{ width: "100%", height: "56px", fontSize: "24px" }}
              >
                {productInfo.category}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div style={{ flex: "1" }}>
            <p className="create_product_label">Price</p>
            <Input
              className="create_product_input"
              value={productInfo.price}
              onChange={(e) => {
                setProductInfo((pre) => ({ ...pre, price: e.target.value }));
              }}
            ></Input>
          </div>
        </div>
        <div className="create_product_group">
          <div style={{ flex: "1" }}>
            <p className="create_product_label">In Stock Quantity</p>
            <Input
              className="create_product_input"
              value={productInfo.quantity}
              onChange={(e) => {
                setProductInfo((pre) => ({ ...pre, quantity: e.target.value }));
              }}
            ></Input>
          </div>
          <div style={{ flex: "3" }}>
            <p className="create_product_label">Add Image Link</p>
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Input
                className="create_product_input"
                value={productInfo.imgURL}
                onChange={(e) => {
                  setProductInfo((pre) => ({ ...pre, imgURL: e.target.value }));
                }}
              ></Input>
              <Button
                type="primary"
                style={{ height: "56px", backgroundColor: "#5048E5" }}
                onClick={()=>{setPreviewImgURL(productInfo.imgURL);}}
              >
                Upload
              </Button>
            </Space.Compact>
          </div>
        </div>
        <div className="create_product_img_preview">
          {previewImgURL ? (
            <img src={previewImgURL} style={{width:"100%", height:"100%"}}></img>
          ) : (
            <Empty
              image={blankImage}
              imageStyle={{
                height: 60,
              }}
              description={
                <span
                  style={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    color: "#6B7280",
                  }}
                >
                  Image Preview!
                </span>
              }
            ></Empty>
          )}
        </div>
        <Button
          type="primary"
          style={{ height: "40px", backgroundColor: "#5048E5" }}
          onClick={handleSubmit}
        >
          {productId ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </div>
  );
}
