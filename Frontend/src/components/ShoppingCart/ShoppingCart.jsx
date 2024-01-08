import { useEffect, useState } from "react";
import "./ShoppingCart.css";
import { InputNumber, Divider, Button } from "antd";

const ShoppingCart = ({ token }) => {
  const dummyData = `{
        "_id": "659b517bf3a670ac8db9d3dd",
        "userID": "6598f0ddbc2938cab284e2bb",
        "items": [
            {
                "productID": {
                    "_id": "6598f4771db01985aede9af4",
                    "name": "galaxy tab s7",
                    "description": "Samsung's old tablet",
                    "imgURL": "https://i.imgur.com/bZQg5ib.png",
                    "quantity": 100,
                    "price": 250,
                    "category": "Eletronics",
                    "createdAt": "2024-01-06T06:34:31.563Z",
                    "__v": 0
                },
                "quantity": 2,
                "_id": "659b8f78e2818c0fa5f39f72"
            },
            {
                "productID": {
                    "_id": "6597b18cec341c1e4bf9232a",
                    "name": "meta quest3",
                    "description": "default content",
                    "imgURL": "https://i.imgur.com/bZQg5ib.png",
                    "quantity": 100,
                    "price": 250,
                    "category": "Eletronics",
                    "createdAt": "2024-01-05T07:36:44.191Z",
                    "__v": 0
                },
                "quantity": 2,
                "_id": "659b9110db767a7bfbc1289a"
            }
        ],
        "createdAt": "2024-01-08T01:35:55.761Z",
        "updatedAt": "2024-01-08T06:07:12.377Z",
        "__v": 10
    }`;
  const [items, setItems] = useState([]);

  const onRemove = (productID) => () => {
    const payload = {
        method: "DELETE",
        headers: {
          "x-auth-token": token
        },
      };
      fetch(`http://localhost:3000/api/cart/${productID}`, payload).then((res)=>res.json()).then((data)=> {
        if("items" in data) {
            setItems(data.items);
        }
        return;
      });
  };

  const onChange = (productID) => (value) => {
    const newItem = {
            productID,
            quantity: value
    };
    const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        },
        body: JSON.stringify(newItem)
      };
    fetch("http://localhost:3000/api/cart", payload).then((res)=>res.json()).then((data)=> {
        if("items" in data) {
            setItems(data.items);
        }
        return;
    });
    
  };
  useEffect(() => {
    async function getData() {
      try {        
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token            
          },
        };
        const res = await fetch("http://localhost:3000/api/cart", options);
        const data = await res.json();

        //console.log(`data: ${JSON.stringify(data)}`);
        //console.log("items" in data);
        if(!("items" in data)) {
            setItems([]);
        }else {            
            setItems(data.items);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    getData();
  }, []);

  const subtotal = items.reduce(
    (acc, curr) => acc + curr.quantity * curr.productID.price,
    0
  );

  const tax = subtotal * 0.1;
  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart-header">
        <h2>Cart({items.reduce((acc, curr) => acc + curr.quantity, 0)})</h2>
      </div>

      <div className="shopping-cart-items">
        {items.map((i) => (
          <div key={i.productID._id} className="shopping-cart-item">
            <img src={i.productID.imgURL} />
            <div className="item-info">
              <div className="item-flex-between">
                <h3>{i.productID.name}</h3>
                <p>${i.productID.price}</p>
              </div>
              <div className="item-flex-between">
                <div>
                  <InputNumber min={1} value={i.quantity} onChange={onChange(i.productID._id)} />
                </div>
                <span className="item-remove" onClick={onRemove(i.productID._id)}>Remove</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Divider />
      <div className="checkout-summary">
        <div className="item-grid-between">
          <p>Subtotal</p>
          <p>$ {subtotal}</p>
        </div>

        <div className="item-grid-between">
          <p>Tax</p>
          <p>$ {tax}</p>
        </div>

        <div className="item-grid-between">
          <p>Estimated total</p>
          <p>$ {tax + subtotal}</p>
        </div>

        <Button type="primary" block>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
