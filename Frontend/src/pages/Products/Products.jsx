import { useState, useEffect } from "react";
import { Card, List, Button, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import "./Products.css"

export default function Products(props) {
    const { isAdmin } = props;
    const [products, setProducts] = useState([]);
    const [menuTitle, setMenuTitle] = useState('Last added');

    const handleMenuClick = (e) => {
        const newSortLable = dropdownItems[e.key - 1].label;
        setMenuTitle(newSortLable);
        if (newSortLable === 'Price: low to high') {
            setProducts([...products].sort((a, b) => a.price - b.price));
        } else if (newSortLable === 'Price: high to low') {
            setProducts([...products].sort((a, b) => b.price - a.price));
        } else {
            setProducts([...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        }
    };

    const dropdownItems = [
        {
            label: 'Last added',
            key: '1',
        },
        {
            label: 'Price: low to high',
            key: '2',
        },
        {
            label: 'Price: high to low',
            key: '3',
        },
    ];

    const menuProps = {
        items: dropdownItems,
        onClick: handleMenuClick,
    };

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts([...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    return (
        <div id='content' className='products-page'>
            <div className="products-page-header">
                <h2>Products Page</h2>
                <div className="products-page-header-buttons">
                    <Dropdown className="sorting-dropdown" menu={menuProps}>
                        <Button>
                            <Space>
                                {menuTitle}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    {isAdmin && <Button type="primary" className="add-to-cart-button">Add product</Button>}
                </div>

            </div>

            <List
                className='products-list'
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 8,
                }}
                dataSource={products}
                renderItem={(product) => (
                    <List.Item>
                        <Card className='product_card'>
                            <div >
                                <div className='product_img_container'>
                                    <img className='product_img' src={product.imgURL}></img>
                                </div>
                                <div className='product_info'>
                                    <p>{product.name}</p>
                                    <p>${product.price}</p>
                                </div>
                                <Button type="primary" className="add-to-cart-button">Add to cart</Button>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    )
}
