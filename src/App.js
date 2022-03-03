import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompleted } from "./redux/completed/completedReducer";
import { getActiveWords, checkAnswer } from "./redux/actives/activesReducer";
import './App.css';
import Home from './components/home/homePage';

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
      <Home completed={completed} actives={actives} />
    </div>
  );
}

export default App;
