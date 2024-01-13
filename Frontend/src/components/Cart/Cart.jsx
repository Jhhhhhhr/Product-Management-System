import { Input, Drawer, Button, List, Spin } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItem, removeCartItem } from "../../features/cart/cartSlice";

export default function Cart(props) {
  const { open, setOpen } = props;
  const items = useSelector((state) => state.cart.cart.items);
  const loading = useSelector((state) => state.cart.loading);
  const token = useSelector((state) => state.user.info.token);
  const dispatch = useDispatch();
  const subtotal = items.reduce(
    (acc, curr) => acc + curr.quantity * curr.productID.price,
    0
  );

  const tax = subtotal * 0.1;

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
    if (quantity <= 0) {
      return;
    }

    try {
      await dispatch(updateCartItem({ token, productID, quantity })).unwrap();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleRemove = (productID) => async () => {    
    try {
      await dispatch(removeCartItem({ token, productID })).unwrap();
    } catch (e) {
      alert(e.message);
    }
  };

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
        <div className="discount-code-text">Apply Discount Code</div>
        <div className="discount-code-bar">
          <Input placeholder="Input you discount code here" />
          <Button type="primary">Apply</Button>
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
        {/* <div className="price-bar">
          <span>Discount: </span>
          <span>-$20</span>
        </div> */}
        <div className="price-bar">
          <span>Estimated total: </span>
          <span>${(subtotal + tax).toFixed(2)}</span>
        </div>
        <Button style={{ width: "100%" }} type="primary">
          Continue to checkout
        </Button>
      </Drawer>
    </div>
  );
}
