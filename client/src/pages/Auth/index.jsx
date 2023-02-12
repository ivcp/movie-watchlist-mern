import React, { useContext, useState, useEffect } from 'react';
import useField from './hooks/useField';
import { useMutation } from 'react-query';
import auth from '../../services/auth';
import UserContext from '../../context/user-context';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import styles from './styles.module.css';
import { BsEyeFill } from 'react-icons/bs';
import utils from '../../styles/utils.module.css';

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
      onError: error => toast.error(error.message),
      onSuccess: user => {
        loginUser(user);
        toast.success(
          `${user.name} ${isLogin ? 'logged in' : 'registered'} successfully`
        );
        navigate('/');
      },
    }
  );

  useEffect(() => {
    document.title = 'Log in/Register';
  }, []);

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
    <div className={styles.auth}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <h1>{isLogin ? 'log in' : 'register'}</h1>
        <form className={styles.form} onSubmit={handleSubmitForm}>
          {!isLogin && (
            <>
              <input {...firstName} />
              <input {...lastName} />
            </>
          )}
          <input {...email} />
          <div className={styles.passwordContainer}>
            <input type={showPassword ? 'text' : 'password'} {...password} />
            <button
              className={styles.showPassword}
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
            >
              <BsEyeFill size={18} />
              <span className={utils.srOnly}>show password</span>
            </button>
          </div>
          <button
            className={styles.submitBtn}
            type="sumbit"
            id="submit-credentials"
          >
            {isLogin ? 'log in' : 'register and log in'}
          </button>
          <div className={styles.google}>
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
                toast.info('Something went wrong');
              }}
              type="icon"
              theme="filled_blue"
              shape="circle"
            />
            <p>{`${isLogin ? 'log in' : 'register'}`} with Google</p>
          </div>
          {isLogin ? (
            <button
              className={styles.toggle}
              onClick={() => setIsLogin(false)}
              type="button"
            >
              don&apos;t have an account? <span>register</span>
            </button>
          ) : (
            <button
              className={styles.toggle}
              onClick={() => setIsLogin(true)}
              type="button"
            >
              already have an account? <span>log in</span>
            </button>
          )}
        </form>
      </GoogleOAuthProvider>
    </div>
  );
};

export default AuthForm;
