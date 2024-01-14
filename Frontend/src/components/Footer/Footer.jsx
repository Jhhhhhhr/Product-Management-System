import './Footer.css';
import {FacebookOutlined,TwitterOutlined,YoutubeOutlined } from "@ant-design/icons";

export default function Footer(){
    return (
        <div className='footer'>
            <div className='footer_contacts'>
                <p style={{color:'white'}}>Contact Us</p>
                <p style={{color:'white'}}>Privact Policies</p>
                <p style={{color:'white'}}>Help</p>
            </div>
            <div className='footer_icons'>
                <FacebookOutlined style={{color:'white'}}/>
                <TwitterOutlined style={{color:'white'}}/>
                <YoutubeOutlined style={{color:'white'}}/>
            </div>
            <p className='footer_rights' style={{color:'white', paddingLeft: '5%'}}>@2022 All Rights Reserved</p>
        </div>
    )
}