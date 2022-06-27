import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/userSlice';

const LoginForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const input = {
      email: form.email.value.toLowerCase(),
      password: form.password.value.toString(),
      remember: form.remember.checked,
    };

    dispatch(login(input));
    return true;
  };

  return (
    <form
      id="login-form"
      className="login-form d-flex col"
      method="POST"
      onSubmit={handleSubmit}
      noValidate
      name="login-form"
    >
      {user.error.login.length > 0
        && <p className="form-error-text">Wrong email or password</p>}
      <label className="login-form-label d-flex col" htmlFor="email">
        <strong className="login-form-text">Email:</strong>
        <input type="email" name="email" className="login-form-input" />
      </label>
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

export default LoginForm;
