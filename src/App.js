import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getCompleted } from "./redux/completed/completedReducer";
import { getActiveWords } from "./redux/actives/activesReducer";
import './App.css';
import Home from './components/home/homePage';
import Completed from "./components/completed/completed";
import NavBar from "./components/header/navBar";

const App = () => {
  const completed = useSelector((state) => state.completed);
  const actives = useSelector((state) => state.actives);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!completed.length) {
      dispatch(getCompleted());
    }
  }, []);

  useEffect(() => {
    if (!actives.length) {
      dispatch(getActiveWords());
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <header className="header">
          <NavBar />
        </header>
        <Routes>
          <Route path='/' element={<Home actives={actives} />} />
          <Route path='/Completed' element={<Completed completed={completed} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
