import styles from "./ProductDetail.module.css";
import { Tag, Button, message  } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItem, removeCartItem } from "../../features/cart/cartSlice";
import { fetchOneProductInfo } from "../../services/product";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";

export default function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const { username, isAdmin, token } = useSelector((state) => state.user.info);
  const cartItems = useSelector((state) => state.cart.cart.items);
  const [quantityInCart, setQuantityInCart] = useState(0);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if(location.state?.message){
      messageApi.info(location.state?.message);
    }
    fetchOneProductInfo(id)
      .then((data) => {
        setDetail(data);
        const decoded = jwtDecode(token);
        if(data.owner === decoded.user.id){
          setIsOwner(true);
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(()=>{
    const cartItem = cartItems.find((item) => item.productID._id === id);
    const quantity = cartItem ? cartItem.quantity : 0;
    setQuantityInCart(quantity);
  },[cartItems]);

  const changeQuantityInCart = (type) => async () => {
    let curQuantity = quantityInCart;
    if(type==="add"){
      curQuantity += 1;
    }
    else if(type === "sub"){
      curQuantity -= 1;
    }
    else if(type ==="insert"){
      curQuantity = 1;
    }

    setQuantityInCart(curQuantity);

    if(curQuantity===0){
      dispatch(removeCartItem({ token, productID: id }));
      return;
    }

    try {
      await dispatch(updateCartItem({ token, productID: id, quantity: curQuantity })).unwrap();
    } catch (e) {
      alert(e.message);
    }
  };

  const onClickEditProduct = () => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <>
      {contextHolder}
      <div id="content">
        <h4 className={styles.title}>
          Products Detail
        </h4>
        <div className={styles.pd_card}>
          <div className={styles.pd_img_container}>
            <img className={styles.pd_img} src={detail.imgURL}></img>
          </div>
          <div className={styles.pd_info}>
            <p className={styles.pd_category}>{detail.category}</p>
            <h4 className={styles.pd_name}>{detail.name}</h4>
            <div className={styles.container}>
              <h4 className={styles.pd_price}>${detail.price}</h4>
              {detail.quantity > 0 ? (
                <Tag
                  style={{
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  color="green"
                >
                  In Stock
                </Tag>
              ) : (
                <Tag
                  style={{
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  color="red"
                >
                  Out Of Stock
                </Tag>
              )}
            </div>
            <pre className={styles.pd_desc}>{detail.description}</pre>
            <div className={styles.button_container}>
              {username && detail.quantity > 0 &&
                (quantityInCart > 0 ? (
                  <div className={styles.cart_button_container}>
                    <Button
                      className={styles.cart_button}
                      icon={<MinusOutlined />}
                      onClick={changeQuantityInCart("sub")}
                    >
                      {" "}
                    </Button>
                    <span className={styles.quantity_in_cart}>
                      {quantityInCart}
                    </span>
                    <Button
                      className={styles.cart_button}
                      icon={<PlusOutlined />}
                      onClick={changeQuantityInCart("add")}
                    >
                      {" "}
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="primary"
                    className={styles.add_product_button}
                    onClick={changeQuantityInCart("insert")}
                  >
                    Add To Cart
                  </Button>
                ))}
              {isAdmin && isOwner && (
                <Button
                  type="primary"
                  className={styles.edit_button}
                  onClick={onClickEditProduct}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
