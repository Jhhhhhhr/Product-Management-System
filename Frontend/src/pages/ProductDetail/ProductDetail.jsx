import './ProductDetail.css';

export default function ProductDetail() {
    return (
        <>
            <div id='content'>
                <h2 style={{paddingLeft:'5%'}}>Products Detail</h2>
                <div className='pd_card'>
                    <div className='pd_img_container'>
                        <img className='pd_img' src='https://media.gamestop.com/i/gamestop/20006782?$pdp2x$'></img>
                    </div>
                    <div className='pd_info'>
                        <p>Category1</p>
                        <p>Meta Quest2 VR headset</p>
                        <p>$299</p>
                        <p>descripition</p>
                    </div>
                </div>
            </div>
        </>
    )
}