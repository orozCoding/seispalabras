import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getCompleted } from "./redux/completedSlice";
import { getActiveWords } from "./redux/activesSlice";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/homePage';
import Completed from "./pages/completed";
import NavBar from "./components/header/navBar";
import About from "./pages/aboutPage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import NotFound from "./pages/notFoundPage";
import { ToastContainer } from 'react-toastify';
import { checkSession } from "./redux/userSlice";

const App = () => {

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.logged) {
      console.log(user.student.token);
      dispatch(getActiveWords(user.student.token));
      dispatch(getCompleted(user.student.token));
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch])


  return (
    <div className="appBody d-flex col">
      <ToastContainer />
      <Router>
        <header className="header">
          <NavBar />
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Completed' element={<Completed />} />
          <Route path='/About' element={<About />} />
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/Signup' element={<SignUpPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
