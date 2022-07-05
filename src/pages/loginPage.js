import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import { cleanErrors } from '../redux/userSlice';

const LoginPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.logged) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => () => (
    dispatch(cleanErrors())
  ), [dispatch]);

  return (
    <section className="login-container d-flex col">
      <p className="title bold">Log In</p>
      <LoginForm />
      <div className="login-signup-text d-flex col">
        <p>Don&apos;t have an account?</p>
        <NavLink to="/Signup" className="myLink">SIGN UP HERE</NavLink>
      </div>
    </section>
  );
};

export default LoginPage;
