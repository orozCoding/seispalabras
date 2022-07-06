import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChangePasswordForm from '../components/password/ChangePasswordForm';

const ChangePasswordPage = () => {
  const { token } = useParams();
  const [checkResult, setCheckResult] = useState('');
  const navigate = useNavigate();
  const baseURL = 'http://localhost:3000';

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
        .then((data) => {
          setCheckResult(data);
        })
        .catch((error) => error);

      return resp;
    };

    const checkResetToken = async (token) => {
      const check = await testResetPasswordToken(token);
      if (typeof check === 'object') {
        navigate('/Reset');
        toast('Your link expired.');
      }
    };

    checkResetToken(token);
  }, []);

  return (
    <div>
      <p>Hello from page</p>
      <ChangePasswordForm />
      <p>acá</p>
      <p>{checkResult.name}</p>
    </div>
  );
};

export default ChangePasswordPage;
