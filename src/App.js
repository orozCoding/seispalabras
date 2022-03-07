import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getCompleted } from "./redux/completed/completedReducer";
import { getActiveWords } from "./redux/actives/activesReducer";
import './App.css';
import Home from './pages/homePage';
import Completed from "./pages/completed";
import NavBar from "./components/header/navBar";
import About from "./pages/aboutPage";
import NotFound from "./pages/notFoundPage";

const App = () => {
  const completed = useSelector((state) => state.completed);
  const actives = useSelector((state) => state.actives);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!completed.length) {
      dispatch(getCompleted());
    }
  }, [completed.length, dispatch]);

  useEffect(() => {
    if (!actives.length) {
      dispatch(getActiveWords());
    }
  }, [actives.length, dispatch]);

  return (
    <div className="appBody d-flex col">
      <Router>
        <header className="header">
          <NavBar />
        </header>
        <Routes>
          <Route path='/' element={<Home actives={actives} />} />
          <Route path='/Completed' element={<Completed completed={completed} />} />
          <Route path='/About' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
