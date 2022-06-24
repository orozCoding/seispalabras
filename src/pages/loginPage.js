import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
import { cleanErrors } from "../redux/userSlice";
import { toast } from "react-toastify";

const LoginPage = () => {

  const user = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.logged) {
      navigate('/')
      toast(`Welcome ${user.student.name}`)
    }
  }, [user, navigate])

  useEffect(() => {
    return () => (
      dispatch(cleanErrors())
    );
  }, [dispatch])

  return (
    <>
      <div>Please Log In</div>
      {user.error.login.length > 0 &&
        <p>Wrong email or password</p>}
      <LoginForm />
    </>
  )
}

export default LoginPage;