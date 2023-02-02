import React, { useContext, useState } from 'react';
import useField from './hooks/useField';
import { useMutation } from 'react-query';
import auth from '../../services/auth';
import UserContext from '../../context/user-context';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const firstName = useField('text', 'first name*');
  const lastName = useField('text', 'last name');
  const email = useField('email', 'email*');
  const password = useField('password', 'password*');
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { mutate } = useMutation(
    credentials => auth(credentials, isLogin ? 'login' : 'users'),
    {
      onError: error => console.log(error.message),
      onSuccess: user => {
        //set user
        loginUser(user);
        //notification TODO:
        toast.success(
          `${user.name} ${isLogin ? 'logged in' : 'registered'} successfully`
        );
        navigate('/');
      },
    }
  );

  const userData = {
    email: email.value.trim(),
    password: password.value.trim(),
  };
  if (!isLogin) {
    userData.firstName = firstName.value.trim();
    userData.lastName = lastName.value.trim();
  }

  const handleSubmitForm = e => {
    if (e) e.preventDefault();
    mutate(userData, {
      onSuccess: () => {
        firstName.onChange('');
        lastName.onChange('');
        email.onChange('');
        password.onChange('');
        setIsLogin(true);
      },
      onError: error => {
        if (
          !e &&
          error.message === `user with email ${userData.email} does not exist`
        ) {
          setIsLogin(false);
        }
      },
    });
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <h1>{isLogin ? 'log in' : 'register'}</h1>
      <form onSubmit={handleSubmitForm}>
        {!isLogin && (
          <>
            <input {...firstName} />
            <input {...lastName} />
          </>
        )}
        <input {...email} />
        <input type={showPassword ? 'text' : 'password'} {...password} />
        <button type="button" onClick={() => setShowPassword(prev => !prev)}>
          show password
        </button>
        <button type="sumbit">
          {isLogin ? 'log in' : 'register and log in'}
        </button>
        <GoogleLogin
          onSuccess={credentialResponse => {
            const credentials = jwt_decode(credentialResponse.credential);
            userData.email = credentials.email;
            userData.password = credentials.sub;
            if (!isLogin) {
              userData.firstName = credentials.given_name;
              userData.lastName = credentials.family_name;
            }
            handleSubmitForm();
          }}
          onError={() => {
            console.log('Error');
          }}
          shape="circle"
          text="continue_with"
        />
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
    </GoogleOAuthProvider>
  );
};

export default AuthForm;
