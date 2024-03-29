import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Drawer, Button, List, Spin } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import "./Cart.css";
import { updateCartItem, removeCartItem } from "../../features/cart/cartSlice";

export default function Cart(props) {
  const { open, setOpen, setTotal } = props;
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const items = useSelector((state) => state.cart.cart.items);
  const loading = useSelector((state) => state.cart.loading);
  const token = useSelector((state) => state.user.info.token);
  const dispatch = useDispatch();

  const subtotal = items.reduce(
    (acc, curr) => acc + curr.quantity * curr.productID.price,
    0
  );
  const tax = subtotal * 0.1;
  const overall = subtotal + tax - discount;
  useEffect(() => {
    setTotal(overall);
    if (subtotal === 0) setDiscount(0);
  }, [overall]);

  const handlePlus = (productID, quantity) => async () => {
    quantity += 1;
    try {
      await dispatch(updateCartItem({ token, productID, quantity })).unwrap();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleSubtract = (productID, quantity) => async () => {
    quantity -= 1;
    try {
      if (quantity <= 0) {
        await dispatch(removeCartItem({ token, productID })).unwrap();
        setDiscount(0);
      } else {
        await dispatch(updateCartItem({ token, productID, quantity })).unwrap();
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const handleRemove = (productID) => async () => {
    try {
      await dispatch(removeCartItem({ token, productID })).unwrap();
      if (items.length === 1) {
        setDiscount(0);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const handleApplyCoupon = () => {
    if (coupon === 'OFF20') {
      setDiscount(20);
      setCoupon("");
    } else {
      setDiscount(0);
      alert('Coupon is not valid!');
    }
  }

  return (
    <div>
      <Drawer
        className="custom-drawer"
        title="Cart"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <List
          className="cart-list-container"
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <div className="cart-product-item">
                <img
                  className="cart-product-img"
                  src={item.productID.imgURL}
                  alt="Image Not Available"
                ></img>
                <div className="cart-product-info">
                  <div className="cart-product-detail">
                    <div>{item.productID.name}</div>
                    <div>${item.productID.price}</div>
                  </div>
                  <div className="cart-product-detail">
                    <div>
                      {loading ? (
                        <Spin />
                      ) : (
                        <>
                          <Button
                            size="small"
                            icon={<MinusOutlined />}
                            onClick={handleSubtract(
                              item.productID._id,
                              item.quantity
                            )}
                          ></Button>
                          <span className="product-quantity">
                            {item.quantity}
                          </span>
                          <Button
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={handlePlus(
                              item.productID._id,
                              item.quantity
                            )}
                          ></Button>
                        </>
                      )}
                    </div>
                    {loading ? <Spin /> : <div onClick={handleRemove(item.productID._id)}>remove</div>}
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
        <div className="discount-code-text">Apply Promotion Code</div>
        <div className="discount-code-bar">
          <Input placeholder="Try OFF20" value={coupon} onChange={e => setCoupon(e.target.value)} />
          <Button type="primary" onClick={handleApplyCoupon}>Apply</Button>
        </div>
        <hr />
        <div className="price-bar">
          <span>Subtotal: </span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="price-bar">
          <span>Tax(10%): </span>
          <span>${tax.toFixed(2)}</span>
        </div>
        {discount > 0 &&
          <div className="price-bar">
            <span>Discount:</span>
            <div>
              <u onClick={() => setDiscount(0)}>remove</u>
              <span>-${discount}</span>
            </div>
          </div>
        }
        <div className="price-bar">
          <span>Estimated total: </span>
          <span>${overall.toFixed(2)}</span>
        </div>
        <Button style={{ width: "100%" }} type="primary">
          Continue to checkout
        </Button>
      </Drawer>
    </div>
  );
}
