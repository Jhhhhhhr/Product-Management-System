import { Card, List } from 'antd';
import "./Products.css"

export default function Products() {
    const productsData = [
        {
            src: "https://media.gamestop.com/i/gamestop/20006782?$pdp2x$",
            name: "Meta Quest1 VR headset",
            price: "$199"
        },
        {
            src: "https://media.gamestop.com/i/gamestop/20006782?$pdp2x$",
            name: "Meta Quest2 VR headset",
            price: "$299"
        },
        {
            src: "https://media.gamestop.com/i/gamestop/20006782?$pdp2x$",
            name: "Meta Quest3 VR headset",
            price: "$399"
        },
        {
            src: "https://media.gamestop.com/i/gamestop/20006782?$pdp2x$",
            name: "Meta Quest4 VR headset",
            price: "$499"
        },
        {
            src: "https://media.gamestop.com/i/gamestop/20006782?$pdp2x$",
            name: "Meta Quest5 VR headset",
            price: "$599"
        },
        {
            src: "https://media.gamestop.com/i/gamestop/20006782?$pdp2x$",
            name: "Meta Quest6 VR headset",
            price: "$699"
        },
    ];
    return (
        <div id='content' className='products-page'>
            <h2>Products Main Page</h2>
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
                dataSource={productsData}
                renderItem={(item) => (
                    <List.Item>
                        <Card className='product_card'>
                            <div >
                                <div className='product_img_container'>
                                    <img className='product_img' src={item.src}></img>
                                </div>
                                <div className='product_info'>
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                </div>
                            </div>

                        </Card>
                    </List.Item>
                )}
            />
        </div>

    )
}
