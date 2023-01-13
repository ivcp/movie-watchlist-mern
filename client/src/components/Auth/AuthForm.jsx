import React, { useState } from 'react';
import useField from '../../hooks/useField';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const firstName = useField('text', 'first name*');
  const lastName = useField('text', 'last name');
  const email = useField('email', 'email*');
  const password = useField('password', 'password*');

  const changePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <>
      <h1>{isLogin ? 'log in' : 'register'}</h1>
      <form>
        {!isLogin && (
          <>
            <input {...firstName} />
            <input {...lastName} />
          </>
        )}
        <input {...email} />
        <input type={showPassword ? 'text' : 'password'} {...password} />
        <button type="button" onClick={changePasswordVisibility}>
          show password
        </button>
        <button type="sumbit">{isLogin ? 'log in' : 'register'}</button>
        <button type="sumbit">
          {isLogin ? 'log in with Google' : 'register with Google'}
        </button>
        {isLogin ? (
          <button onClick={() => setIsLogin(false)} type="button">
            don&apos;t have an account? register
          </button>
        ) : (
          <button onClick={() => setIsLogin(true)} type="button">
            already have an account? log in
          </button>
        )}
      </form>
    </>
  );
};

export default AuthForm;
