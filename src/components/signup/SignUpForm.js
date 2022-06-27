import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/userSlice';
import capitalize from '../shared/capitalize';

const SignUpForm = () => {

  const error = useSelector((state) => state.user.error.signup)

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target

    const input = { user: {
      "name": form.name.value,
      "username": form.username.value,
      "email": form.email.value.toLowerCase(),
      "password": form.password.value,
      "password_confirmation": form.password_confirmation.value,
    }
    }

    dispatch(signup(input))
    return true
    
  }

  const renderErrors = (errors) => {
    return errors.map((error) => (
      <p className="form-error-text">{capitalize(error)}</p>
    ))
  }

  return (
    <form id="signup-form"
      className="login-form d-flex col"
      method="POST"
      onSubmit={handleSubmit}
      noValidate
      name="login-form"
      autoComplete="off"
    >
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Name:</strong>
        {error.name && renderErrors(error.name)}
        <input type="text" name="name" className='login-form-input' autoComplete="off"/>
      </label>
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Username:</strong>
        {error.username && renderErrors(error.username)}
        <input type="text" name="username" className='login-form-input' autoComplete="off"/>
      </label>
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Email:</strong>
        {error.email && renderErrors(error.email)}
        <input type="email" name="email" className='login-form-input' autoComplete="off"/>
      </label>
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Password:</strong>
        {error.password && renderErrors(error.password)}
        <input type="password" name="password" className='login-form-input' autoComplete="off"/>
      </label>
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Confirm Password:</strong>
        {error.password_confirmation && renderErrors(error.password_confirmation)}
        <input type="password" name="password_confirmation" className='login-form-input' autoComplete="off"/>
      </label>
      <input className="login-form-btn click" type="submit" value="SEND" />
    </form>
  )
}

export default SignUpForm;