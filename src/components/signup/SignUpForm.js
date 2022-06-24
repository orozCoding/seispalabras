import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/userSlice';

const SignUpForm = () => {

  const error = useSelector((state) => state.user.error.signup)

  console.log(error);

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

    console.log(input);

    dispatch(signup(input))
    return true
    
  }

  useEffect(() => {
    console.log(error);
  })

  return (
    <form id="signup-form"
      className="login-form d-flex col"
      method="POST"
      onSubmit={handleSubmit}
      noValidate
      name="login-form"
    >
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Name:</strong>
        {error.name? <p>Name {error.name}</p> : null}
        <input type="text" name="name" className='login-form-input' />
      </label>
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Username:</strong>
        {error.username && <p>Username {error.username}</p>}
        <input type="text" name="username" className='login-form-input' />
      </label>
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Email:</strong>
        {error.email && <p>Email {error.email}</p>}
        <input type="email" name="email" className='login-form-input' />
      </label>
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Password:</strong>
        {error.password && <p>Password {error.password}</p>}
        <input type="password" name="password" className='login-form-input' />
      </label>
      <label className="login-form-label d-flex col">
        <strong className="login-form-text">Confirm Password:</strong>
        {error.password_confirmation && <p>It {error.password_confirmation}</p>}
        <input type="password" name="password_confirmation" className='login-form-input' />
      </label>
      <input className="login-form-btn click" type="submit" value="SEND" />
    </form>
  )
}

export default SignUpForm;