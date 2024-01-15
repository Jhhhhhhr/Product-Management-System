import "./ManageProduct.css";
import { Input, Dropdown, Button, Space, Empty, message } from "antd";
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
  const [messageApi, contextHolder] = message.useMessage();

  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    price: null,
    quantity: null,
    category: "",
    imgURL: null,
    updatedAt: null,
    owner: null,
    createdAt: null
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
            updatedAt: data.updatedAt,
            owner: data.owner,
            createdAt: data.createdAt
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

  const handleSubmit = async () => {
    if(!productInfo.name){
      messageApi.info("Please Input Product Name!");
      return;
    }

    if (productId) {
      await updateProduct(token, productId, {...productInfo, updatedAt: Date.now()});
    } else {
      await createProduct(token, {...productInfo, createdAt: Date.now()});
    }
    navigate("/");
    navigate(0);
  };

  const handleChooseCategory = ({ key }) => {
    let selectedCategory = categories.find((item) => item.key === key).label;
    setProductInfo((pre) => ({ ...pre, category: selectedCategory }));
  };

  return (
    <div id="content">
      {contextHolder}
      <h4 className="create_product_title">
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
          style={{ fontSize: "1rem" }}
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
                style={{ width: "100%", height: "2rem", fontSize: "1rem" }}
              >
                {productInfo.category? productInfo.category: "Choose Category"}
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
                style={{ height: "2rem", backgroundColor: "#5048E5" }}
                onClick={()=>{setPreviewImgURL(productInfo.imgURL);}}
              >
                Upload
              </Button>
            </Space.Compact>
          </div>
        </div>
        <div className="create_product_img_preview">
          {previewImgURL ? (
            <img src={previewImgURL} className="preview-img"></img>
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
        <div className="button_container">        
          <Button
            type="primary"
            style={{ height: "40px", backgroundColor: "#5048E5" }}
            onClick={handleSubmit}
          >
            {productId ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </div>
    </div>
  );
}
