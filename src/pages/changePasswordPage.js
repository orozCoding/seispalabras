import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChangePasswordForm from '../components/password/ChangePasswordForm';

const ChangePasswordPage = () => {
  const user = useSelector((state) => state.user);
  const { token } = useParams();
  // const [checkResult, setCheckResult] = useState('');
  const navigate = useNavigate();
  const baseURL = 'http://localhost:3000';

  useEffect(() => {
    if (user.logged) {
      navigate('/');
      toast('Sign Out before resetting your password');
    }
  }, [user]);

  useEffect(() => {
    const testResetPasswordToken = async (token) => {
      const url = `${baseURL}/password/reset/edit`;

      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((resp) => resp.json())
        .then((data) => data)
        .catch((error) => error);

      return resp;
    };

    const checkResetToken = async (token) => {
      const check = await testResetPasswordToken(token);
      if (typeof check === 'object' || check.errors || check.error) {
        navigate('/Reset');
        toast('Your link expired.');
      }
    };

    checkResetToken(token);
  }, []);

  return (
    <section className="change-container d-flex col">
      <p className="title bold">Create New Password</p>
      <ChangePasswordForm />
    </section>
  );
};

export default ChangePasswordPage;
