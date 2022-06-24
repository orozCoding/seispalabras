import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/signup/SignUpForm";
import { toast } from "react-toastify";
import { cleanRegistered } from "../redux/userSlice";

const SignUpPage = () => {

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
    if (user.registered) {
      navigate('/Login')
      toast(`Account created. Please Log In`)
    }
  }, [user, navigate])

  useEffect(() => {
    return () => (
      dispatch(cleanRegistered())
    )
  })

  return (
    <section className="d-flex col">
      <div>Sign Up</div>
      <SignUpForm />
    </section>
  )
}

export default SignUpPage;