import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice';

const LoginForm = () => {

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target

    const input = {
      "email": form.email.value.toLowerCase(),
      "password": form.password.value.toString(),
      "remember": form.remember.checked
    }

    // console.log(input)
    dispatch(login(input))
    return true
  }

  return (
    <form id="login-form"
      className="login-form d-flex col"
      method="POST"
      onSubmit={handleSubmit}
      noValidate
      name="login-form"
    >
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Email:</strong>
        <input type="email" name="email" className='login-form-input' />
      </label>
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Password:</strong>
        <input type="password" name="password" className='login-form-input' />
      </label>
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Remember me:</strong>
        <input type="checkbox" name="remember" className='login-form-checkbox' />
      </label>
      <input className="login-form-btn click" type="submit" value="SEND" />
    </form>
  )
}

export default LoginForm;