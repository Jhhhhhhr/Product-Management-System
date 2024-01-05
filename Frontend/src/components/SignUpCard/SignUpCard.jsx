import { LockOutlined, MailOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
// import { Link } from "react-router-dom";
import './SignUpCard.css'

const SignUpCard = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <div className='close-outlined'><CloseOutlined /></div>
            <h2 className='Sign-in-title'>Sign up an account</h2>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Create account
                </Button>
            </Form.Item>

            <Form.Item>
                Already have an account? <a href="">Sign in</a>
                {/* <p>Already have an account? </p><Link to="#">Sign up</Link> */}
            </Form.Item>
        </Form>
    );
};
export default SignUpCard;