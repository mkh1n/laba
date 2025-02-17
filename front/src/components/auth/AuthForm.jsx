import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, signin } from '../../storage/authSlice';
import MainContainer from '../UI/MainContainer';

const AuthForm = ({ isRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const { username, password } = formData;

  useEffect(() => {
    setFormData({
      username: '',
      password: '',
    });
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await dispatch(register(formData)).unwrap();;
      } else {
        await dispatch(signin(formData)).unwrap();;
      }
    } catch (error) {
      console.log('there is an error', error)
      setError( error);
    }
  };

  return (
    <MainContainer>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-card-body">
            <img
              src="/login.png"
              alt="Login"
            />
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Login"
                className={error ? "invalid-field" : ""}
                required
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className={error ? "invalid-field" : ""}
                required
              />
              <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
              <div className="error-container">
                {error && <p className="error-message">{error}</p>}
            </div>
              <div className="auth-card-footer">
                <a href={isRegister ? "/login" : "/register"}>{isRegister ? "Already have an account?" : "Don't have an account?"}</a>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default AuthForm;
