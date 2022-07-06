import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postResetPassword } from '../redux/shared/fetches';

const Reset = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (user.logged) {
      navigate('/');
      toast('Sign Out before resetting your password');
    }
  }, [user]);

  const validateEmail = (email) => (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (validateEmail(email)) {
      postResetPassword(email);
      setNotification('If an account with that email was found, we have sent a link to reset your password. If you don\'t find the email, please check your spam and promotions folders, and make sure you spelled your email correctly.');
      e.target.email.value = '';
    } else {
      setNotification('Email is invalid.');
    }
  };

  return (
    <section id="reset" className="reset-container d-flex col">
      <p className="title bold">Reset your Password</p>
      <p>Please submit your email:</p>
      <form
        id="reset-form"
        className="login-form d-flex col reset-form"
        method="POST"
        onSubmit={handleSubmit}
        noValidate
        name="login-form"
      >
        <label className="login-form-label d-flex col" htmlFor="email">
          <strong className="login-form-text recover-form-email">Email:</strong>
          <input type="email" name="email" className="login-form-input" />
        </label>
        <input className="login-form-btn click" type="submit" value="SUBMIT" />
      </form>
      {notification && (
        <div className="reset-notification-container">
          <p className="reset-notification">{notification}</p>
        </div>
      )}
    </section>
  );
};

export default Reset;
