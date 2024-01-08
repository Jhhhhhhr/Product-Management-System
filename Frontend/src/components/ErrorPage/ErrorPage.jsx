import { Link } from "react-router-dom";
import { Button, Result } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import "./ErrorPage.css"

export default function ErrorPage() {
    return (
        <div id='content' className="error-page-container">
            <Result
                icon={<ExclamationCircleOutlined />}
                title="Oops, something went wrong!"
                extra={<Link to="/"><Button type="primary">Go Home</Button></Link>}
            />
        </div>
    )
}