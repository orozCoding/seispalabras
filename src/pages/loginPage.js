import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";

const LoginPage = () => {

  const user = useSelector((state) => state.user)
  const navigate = useNavigate();

  useEffect(() => {
    if(user.logged) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <>
      <div>Please Log In</div>
      <LoginForm />
    </>
  )
}

export default LoginPage;