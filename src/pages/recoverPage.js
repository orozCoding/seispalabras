import { useState } from 'react';
import { postResetPassword } from '../redux/shared/fetches';

const Reset = () => {
  const [notification, setNotification] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    postResetPassword(email);
    setNotification('If an account with that email was found, we have sent a link to reset your password. If you don\'t find the email, please check your spam and promotions folders, and make sure you spelled your email correctly.');
    e.target.email.value = '';
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
