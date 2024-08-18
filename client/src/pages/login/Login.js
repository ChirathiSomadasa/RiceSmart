import { useEffect, useState } from 'react';
import React from 'react';
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
 
  const navigate = useNavigate();

  return (
    <div className='bg-image-login'>

      <div className='authentication-login'>

        <div className='authentication-form-login card p-2'>

          <h1 className='card-title'>LOGIN</h1>

          <Form layout='vertical'>

            <Form.Item label='Email' name='email'

              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}>

              <Input className='login_input' placeholder='Email' />

            </Form.Item>

            <Form.Item label='Password' name='password'

              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}>

              <Input.Password className='login_input' placeholder='Password' type='password' />

            </Form.Item>

            <button className='primary-button-login' htmltype='submit'>LOGIN</button>

            <p className='para'>Not have an account?<Link to='/signup' className='anchor'> SIGN UP</Link> </p>
          </Form>
        </div>

      </div>

    </div>
  );
}

export default Login;