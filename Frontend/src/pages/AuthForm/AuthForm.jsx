import { LockOutlined, MailOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import './AuthForm.css'

import { useDispatch } from 'react-redux';
import { fetchUserInfo } from '../../features/user/userSlice';

const AuthForm = (props) => {
    const { type, handleLogin } = props;
    const [promptMsg, setPromptMsg] = useState('Enter your email, we will send you the recovery link');
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { token } = useParams();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        const { username, password } = values;

        if (type === "signIn") {
            try {
                await dispatch(fetchUserInfo({username, password})).unwrap();
                //handleLogin(username, responseData.isAdmin);
                navigate("/");
            } catch (error) {
                alert(error.message);
            }
        } else if (type === "signUp") {
            const { email } = values;
            try {
                const response = await fetch('http://localhost:3000/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password, email }),
                });

                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
                }
                navigate("/signin");
            } catch (error) {
                alert(error.message);
            }
        } else if (type === 'updatePassword') {
            const { email } = values;
            try {
                const response = await fetch('http://localhost:3000/auth/request-reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
                const responseData = await response.text();
                setPromptMsg(responseData);
                if (!response.ok) {
                    throw new Error(responseData || `HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error('Failed to request password reset:', error);
                alert(error.message);
            }
        } else if (type === 'resetPassword') {
            const { newPassword, confirmNewPassword } = values;
            if (newPassword !== confirmNewPassword) {
                alert('Passwords do not match! Please try again');
                return;
            }
            try {
                const response = await fetch(`http://localhost:3000/auth/reset-password/${token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newPassword })
                });
                const responseData = await response.text();
                if (!response.ok) {
                    throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
                }
                alert(responseData);
                navigate("/signin");
            } catch (error) {
                console.error('Failed to request password reset:', error);
                alert(error.message);
            }

        }
        form.resetFields();     // reset form inputs
    };
    return (
        <div id='content' className='form-container'>
            <Form
                form={form}
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Link to="/"><div className='close-outlined'><CloseOutlined /></div></Link>
                <h2 className='Sign-in-title'>
                    {type === 'signIn' && 'Sign in to your account'}
                    {type === 'signUp' && 'Sign up an account'}
                    {type === 'updatePassword' && 'Update your password'}
                    {type === 'resetPassword' && 'Change your password'}
                </h2>
                <p style={{ textAlign: 'center' }}>
                    {type === 'updatePassword' && promptMsg}
                </p>
                {(type === 'signIn' || type === 'signUp') &&
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
                }
                {(type === 'signUp' || type === 'updatePassword') &&
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
                {(type === 'signIn' || type === 'signUp') &&
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
                }
                {(type === 'resetPassword') &&
                    <Form.Item
                        name="newPassword"
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
                            placeholder="New password"
                        />
                    </Form.Item>
                }
                {(type === 'resetPassword') &&
                    <Form.Item
                        name="confirmNewPassword"
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
                            placeholder="Confirm new password"
                        />
                    </Form.Item>
                }
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {type === 'signIn' && 'Sign In'}
                        {type === 'signUp' && 'Create account'}
                        {type === 'updatePassword' && 'Update password'}
                        {type === 'resetPassword' && 'Change password'}
                    </Button>
                </Form.Item>
                {type === 'signIn' &&
                    <Form.Item>
                        Don't have an account?  <Link to="/signup">Sign up</Link>
                        <Link className="login-form-forgot" to="/update-password">Forgot password?</Link>
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