import { useState } from 'react'
import { Input, Drawer, Button, List, InputNumber } from "antd";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import "./Cart.css"

export default function Cart(props) {
    const { open, setOpen } = props;
    const productData = [
        {
            imgURL: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71Y+U4HRcXL._AC_UF894,1000_QL80_.jpg",
            name: "Apple Watch Series 7",
            price: 399
        },
        {
            imgURL: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71Y+U4HRcXL._AC_UF894,1000_QL80_.jpg",
            name: "Apple Watch Series 7",
            price: 399
        },
        {
            imgURL: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71Y+U4HRcXL._AC_UF894,1000_QL80_.jpg",
            name: "Apple Watch Series 7",
            price: 399
        },
        {
            imgURL: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71Y+U4HRcXL._AC_UF894,1000_QL80_.jpg",
            name: "Apple Watch Series 7",
            price: 399
        },
        {
            imgURL: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71Y+U4HRcXL._AC_UF894,1000_QL80_.jpg",
            name: "Apple Watch Series 7",
            price: 399
        },
        {
            imgURL: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71Y+U4HRcXL._AC_UF894,1000_QL80_.jpg",
            name: "Apple Watch Series 7",
            price: 399
        },
        {
            imgURL: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71Y+U4HRcXL._AC_UF894,1000_QL80_.jpg",
            name: "Apple Watch Series 7",
            price: 399
        },
        {
            imgURL: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71Y+U4HRcXL._AC_UF894,1000_QL80_.jpg",
            name: "Apple Watch Series 7",
            price: 399
        }
    ];

    return (
        <div>
            <Drawer className="custom-drawer" title="Cart" placement="right" onClose={() => setOpen(false)} open={open}>
                <List
                    className="cart-list-container"
                    dataSource={productData}
                    renderItem={product => (
                        <List.Item >
                            <div className='cart-product-item'>
                                <img className="cart-product-img" src={product.imgURL} alt="Image Not Available"></img>
                                <div className='cart-product-info'>
                                    <div className='cart-product-detail'>
                                        <div>{product.name}</div>
                                        <div>${product.price}</div>
                                    </div>
                                    <div className='cart-product-detail'>
                                        <div>
                                            <Button size="small" icon={<MinusOutlined />}></Button>
                                            <span className='product-quantity'>30</span>
                                            <Button size="small" icon={<PlusOutlined />}></Button>
                                        </div>
                                        <div>remove</div>
                                    </div>
                                </div>

                            </div>

                        </List.Item>
                    )}
                />
                <div className='discount-code-text'>
                    Apply Discount Code
                </div>
                <div className='discount-code-bar'>
                    <Input placeholder="Input you discount code here" />
                    <Button type="primary">Apply</Button>
                </div>
                <hr />
                <div className='price-bar'>
                    <span>Subtotal: </span>
                    <span>$499</span>
                </div>
                <div className='price-bar'>
                    <span>Tax: </span>
                    <span>$49.90</span>
                </div>
                <div className='price-bar'>
                    <span>Discount: </span>
                    <span>-$20</span>
                </div>
                <div className='price-bar'>
                    <span>Estimated total: </span>
                    <span>$429.10</span>
                </div>
                <Button style={{ width: '100%' }} type="primary">Continue to checkout</Button>
            </Drawer>
        </div>
    )
}
