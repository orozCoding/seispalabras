import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChangePasswordForm = () => {
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      id="change-form"
      className="login-form d-flex col"
      method="POST"
      onSubmit={handleSubmit}
      noValidate
      name="change-form"
    >
      <label className="login-form-label d-flex col" htmlFor="password">
        <strong className="login-form-text">Password:</strong>
        <input type="password" name="password" className="login-form-input" />
      </label>
      <label className="login-form-label d-flex col" htmlFor="remember">
        <strong className="login-form-text">Remember me:</strong>
        <input type="checkbox" name="remember" className="login-form-checkbox" defaultChecked />
      </label>
      <input className="login-form-btn click" type="submit" value="LOGIN" />
    </form>
  );
};

export default ChangePasswordForm;
