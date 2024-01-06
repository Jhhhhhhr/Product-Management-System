import { LockOutlined, MailOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import './AuthForm.css'

const AuthForm = (props) => {
    const { type, handleLogin } = props;
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const { username, password } = values;
        // need more backend support here
        if (type === "signIn") {
            if (username === "qwe" && password === "123") {
                handleLogin(username);
                navigate("/");
            } else {
                alert("Invalid username or password!")
            }
        }

        // need more backend support here
        if (type === "signUp") {
            handleLogin(username);
            navigate("/");
        }
    };
    return (
        <div id='content' className='form-container'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <div className='close-outlined'><CloseOutlined /></div>
                <h2 className='Sign-in-title'>
                    {type === 'signIn' && 'Sign in to your account'}
                    {type === 'signUp' && 'Sign up an account'}
                    {type === 'updatePassword' && 'Update your password'}
                </h2>
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
                        {type === 'signIn' && 'Sign In'}
                        {type === 'signUp' && 'Create account'}
                        {type === 'updatePassword' && 'Update password'}
                    </Button>
                </Form.Item>


                {type === 'signIn' &&
                    <Form.Item>
                        Don't have an account?  <Link to="/signup">Sign up</Link>
                        {/* <p>Don't have an account? </p><Link to="#">Sign up</Link> */}
                        <a className="login-form-forgot" href="">
                            Forgot password?
                        </a>
                    </Form.Item>
                }

                {type === 'signUp' &&
                    <Form.Item>
                        Already have an account? <Link to="/signin">Sign in</Link>
                        {/* <p>Already have an account? </p><Link to="#">Sign up</Link> */}
                    </Form.Item>
                }

            </Form>
        </div>

    );
};
export default AuthForm;