import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, List, Button, Dropdown, Space, Pagination, message } from 'antd';
import { DownOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { updateCartItem, removeCartItem } from "../../features/cart/cartSlice";
import { jwtDecode } from "jwt-decode";
import { fetchAllProducts } from "../../services/product";
import "./Products.css"

export default function Products() {
    const [products, setProducts] = useState([]);
    const [menuTitle, setMenuTitle] = useState('Last added');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();
    const { username, isAdmin, token } = useSelector((state) => state.user.info);
    const cartItems = useSelector((state) => state.cart.cart.items);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const updatePageSize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 500) {
            setPageSize(4); 
        } else if(screenWidth < 760) {
            setPageSize(6); 
        } else if (screenWidth < 1000) {
            setPageSize(9); 
        } else if (screenWidth < 1200) {
            setPageSize(8); 
        } else if (screenWidth < 1500) {
            setPageSize(10); 
        } else {
            setPageSize(14); 
        }
    };

    useEffect(() => {
        updatePageSize(); 
        window.addEventListener("resize", updatePageSize); 
        return () => {
            window.removeEventListener("resize", updatePageSize);
        };
    }, []);
    
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

    const handleAddToCart = (id, stock) => {
        if(stock===0){
            messageApi.info("This product is out of stock!");
            return;
        }
        dispatch(updateCartItem({ token, productID: id, quantity: 1 }));
    }

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
              } else {
                await dispatch(updateCartItem({ token, productID, quantity })).unwrap();
              }
        } catch (e) {
            alert(e.message);
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
        fetchAllProducts()
            .then((data) => {
                console.log(data);
                setProducts([...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    return (
        <div id='content' className='products-page'>
            {contextHolder}
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
                renderItem={(product) => {
                    const cartItem = cartItems.find(item => item.productID._id === product._id);
                    const quantityInCart = cartItem ? cartItem.quantity : 0;
                    const isOwner = token ? jwtDecode(token).user.id === product.owner : false;
                    return (
                        <List.Item className='product_card'>
                            <Card className='product_card'>
                                <div >
                                    <div className='product_img_container' onClick={() => navigate(`/product/${product._id}`)}>
                                        <img className='product_img' src={product.imgURL} alt="Image Not Available"></img>
                                    </div>
                                    <div className='product_info'>
                                        <p>{product.name}</p>
                                        <p>${product.price}</p>
                                    </div>
                                    <div className="product-card-buttons">
                                        {quantityInCart > 0 ? (
                                            <div className="change-cart-quantity">
                                                <Button className="change-cart-quantity-button" icon={<MinusOutlined />} onClick={handleSubtract(product._id, quantityInCart)} />
                                                <span className="product-quantity">{quantityInCart}</span>
                                                <Button className="change-cart-quantity-button" icon={<PlusOutlined />} onClick={handlePlus(product._id, quantityInCart)} />
                                            </div>
                                        ) : (
                                            <>
                                                {username && <Button type="primary" className="card-button" onClick={() => handleAddToCart(product._id, product.quantity)}>Add</Button>}
                                            </>
                                        )}
                                        {isAdmin && isOwner && <Button className="card-button" onClick={() => navigate(`/edit-product/${product._id}`)}>Edit</Button>}
                                    </div>
                                </div>
                            </Card>
                        </List.Item>
                    )
                }
                }
            />
            <Pagination className="pagination" current={currentPage} pageSize={pageSize} total={products.length} onChange={page => setCurrentPage(page)} />
        </div>
    )
}
