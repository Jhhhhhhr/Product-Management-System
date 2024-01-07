import { LockOutlined, MailOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import './AuthForm.css'

const AuthForm = (props) => {
    const { type, handleLogin } = props;
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { username, password } = values;

        if (type === "signIn") {
            try {
                const response = await fetch('http://localhost:3000/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                handleLogin(username, data.isAdmin);
                navigate("/");
            } catch (error) {
                alert('Wrong username or password!')
                console.error('Login failed:', error);
            }
        }

        if (type === "signUp") {
            const { email } = values;
            try {
                const response = await fetch('http://localhost:3000/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password, email }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                navigate("/signin");
            } catch (error) {
                alert('Invalid credentials!')
                console.error('Login failed:', error);
            }
        }
        form.resetFields();     // reset form input fields
    };
    return (
        <div id='content' className='form-container'>
            <Form
                form={form}
                name="normal_login"
                className="login-form"
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
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                {type === 'signUp' &&
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                }
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
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
                        <a className="login-form-forgot" href="">
                            Forgot password?
                        </a>
                    </Form.Item>
                }

                {type === 'signUp' &&
                    <Form.Item>
                        Already have an account? <Link to="/signin">Sign in</Link>
                    </Form.Item>
                }

            </Form>
        </div>
    );
};
export default AuthForm;