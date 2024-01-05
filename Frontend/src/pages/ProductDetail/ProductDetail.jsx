import './ProductDetail.css';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

export default function ProductDetail() {
    return (
        <>
            <Header></Header>
            <div id='content'>
                <h2 style={{paddingLeft:'5%', paddingTop:'3%'}}>Products Detail</h2>
                <div className='product_card'>
                    <div className='product_img_container'>
                        <img className='product_img' src='https://media.gamestop.com/i/gamestop/20006782?$pdp2x$'></img>
                    </div>
                    <div className='product_info'>
                        <p>Category1</p>
                        <p>Meta Quest2 VR headset</p>
                        <p>$299</p>
                        <p>descripition</p>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}