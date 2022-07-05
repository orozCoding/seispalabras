/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getCompleted } from './redux/completedSlice';
import { getActiveWords } from './redux/activesSlice';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/homePage';
import Completed from './pages/completed';
import NavBar from './components/header/navBar';
import About from './pages/aboutPage';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/signUpPage';
import NotFound from './pages/notFoundPage';
import { checkSession } from './redux/userSlice';
import { getWordsLength } from './redux/wordsSlice';
import { getSound } from './redux/soundSlice';
import Loader from './components/shared/loader';
import Reset from './pages/recoverPage';

const App = () => {
  const user = useSelector((state) => state.user);
  const actives = useSelector((state) => state.actives);
  const completed = useSelector((state) => state.completed);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.logged) {
      dispatch(getActiveWords(user.student.token));
      dispatch(getCompleted(user.student.token));
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWordsLength());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSound());
  }, [dispatch]);

  const isLoading = () => {
    if (user.status === 'loading' || actives.status === 'loading' || completed.status === 'loading') {
      return true;
    }
    return false;
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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
