import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/homePage";
import Completed from "./pages/completed";
import NavBar from "./components/header/navBar";
import About from "./pages/aboutPage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import NotFound from "./pages/notFoundPage";
import { checkSession, getWords, getTranslations } from "./redux/userSlice";
import { getSound } from "./redux/soundSlice";
import Loader from "./components/shared/loader";
import Reset from "./pages/resetPage";
import ChangePasswordPage from "./pages/changePasswordPage";

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSound());
  }, [dispatch]);

  useEffect(() => {
    if (user.logged && !user.active_words) {
      dispatch(getWords());
      dispatch(getTranslations());
    }
  }, [dispatch, user]);

  const isLoading = () => {
    return user.status === "loading";
  };

  return (
    <div className="appBody d-flex col">
      <ToastContainer />
      <Router>
        <header className="header d-flex">
          <NavBar />
        </header>
        {isLoading() && <Loader />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Completed" element={<Completed />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={user.logged ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/Signup" element={user.logged ? <Navigate to="/" /> : <SignUpPage />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="/Reset/:token" element={<ChangePasswordPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
