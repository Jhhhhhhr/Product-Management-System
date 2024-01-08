import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, List, Button, Dropdown, Space, Pagination } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import "./Products.css"

export default function Products(props) {
    const { isAdmin } = props;
    const [products, setProducts] = useState([]);
    const [menuTitle, setMenuTitle] = useState('Last added');
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 10;

    const currentProducts = products.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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
                setProducts([...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    return (
        <div id='content' className='products-page'>
            <div className="products-page-header">
                <h1>Products</h1>
                <div className="products-page-header-buttons">
                    <Dropdown className="sorting-dropdown" menu={menuProps}>
                        <Button>
                            <Space>
                                {menuTitle}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    {isAdmin && <Link to="/create-product"><Button type="primary" className="add-to-cart-button">Add product</Button></Link>}
                </div>
            </div>
            <List
                className='products-list'
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                }}
                dataSource={currentProducts}
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
                                <div className="product-card-buttons">
                                    <Button type="primary" className="card-button">Add</Button>
                                    {isAdmin && <Button className="card-button">Edit</Button>}                                    
                                </div>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
            <Pagination className="pagination" current={currentPage} pageSize={pageSize} total={products.length} onChange={page => setCurrentPage(page)} />
        </div>
    )
}
