import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';

import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

import { Layout } from 'components/layout';
import styles from 'styles/pages/account/AuthForm.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input type='submit' value='Login' className='btn' />
        </form>

        <p>
          Don't have an account? <Link href='/account/register'>Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;