import styles from "./ProductDetail.module.css";
import { Tag, Button, Space } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItem } from "../../features/cart/cartSlice";
import { fetchOneProductInfo } from "../../services/product";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

export default function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const { username, isAdmin, token } = useSelector((state) => state.user.info);
  const cartItems = useSelector((state) => state.cart.cart.items);
  const [quantityInCart, setQuantityInCart] = useState();

  useEffect(() => {
    fetchOneProductInfo(id)
      .then((data) => {
        setDetail(data);
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
      <div id="content">
        <h4
          style={{
            marginLeft: "5%",
            marginBottom: "1em",
            fontFamily: "Inter",
            fontSize: "32px",
            fontWeight: "700",
            letterSpacing: "0px",
          }}
        >
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
            <p className={styles.pd_desc}>{detail.description}</p>
            <div className={styles.container}>
              {username &&
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
                    style={{ height: "40px", backgroundColor: "#5048E5" }}
                    onClick={changeQuantityInCart("insert")}
                  >
                    Add To Cart
                  </Button>
                ))}
              {isAdmin && (
                <Button
                  type="primary"
                  style={{
                    height: "40px",
                    color: "#535353",
                    backgroundColor: "#ffffff",
                    border: "1px solid #CCCCCC",
                  }}
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
