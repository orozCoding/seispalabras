import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompleted } from "./redux/completed/completedReducer";
import { getActiveWords } from "./redux/actives/activesReducer";
import './App.css';
import Home from './components/home/homePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
        <Routes>
          <Route path='/' element={<Home completed={completed} actives={actives} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
