import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignUpForm from '../components/signup/SignUpForm';
import { cleanRegistered } from '../redux/userSlice';

const SignUpPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.logged) {
      navigate('/');
      toast(`Welcome ${user.student.name}`);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user.registered) {
      navigate('/Login');
      toast('Account created. Please Log In');
    }
  }, [user, navigate]);

  useEffect(() => () => (
    dispatch(cleanRegistered())
  ));

  return (
    <section className="login-container d-flex col">
      <p className="title bold">Sign Up</p>
      <SignUpForm />
    </section>
  );
};

export default SignUpPage;
