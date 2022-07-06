import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchChangePassword } from '../../redux/shared/fetches';
import capitalize from '../shared/capitalize';

const ChangePasswordForm = () => {
  const { token } = useParams();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const input = {
      token,
      user: {
        password: e.target.password.value,
        password_confirmation: e.target.password_confirmation.value,
      },
    };

    const fetch = await fetchChangePassword(input);

    console.log('aca ya no');

    if (input.user.password === '' || input.user.password_confirmation === '') {
      setErrors({ password: ['Both fields are required'] });
      return false;
    }

    if (fetch.password || fetch.password_confirmation || fetch.status === 500) {
      setErrors(fetch);
      return false;
    }
    console.log('llego');

    navigate('/');
    toast('Password updated. Please log in');
  };

  const renderErrors = (errors) => errors.map((error) => (
    <p className="form-error-text" key={errors.indexOf(error)}>{capitalize(error)}</p>
  ));

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
        {errors.password && renderErrors(errors.password)}
        <input type="password" name="password" className="login-form-input" autoComplete="off" />
      </label>
      <label className="login-form-label d-flex col" htmlFor="password_confirmation">
        <strong className="login-form-text">Confirm Password:</strong>
        {errors.password_confirmation && renderErrors(errors.password_confirmation)}
        <input type="password" name="password_confirmation" className="login-form-input" autoComplete="off" />
      </label>
      <label className="login-form-label d-flex col" htmlFor="remember">
        <strong className="login-form-text">Remember me:</strong>
        <input type="checkbox" name="remember" className="login-form-checkbox" defaultChecked />
      </label>
      <input className="login-form-btn click" type="submit" value="SUBMIT" />
    </form>
  );
};

export default ChangePasswordForm;
