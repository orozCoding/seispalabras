import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompleted } from "../../redux/completed/completedReducer";
import { getActiveWords, checkAnswer } from "../../redux/actives/activesReducer";

const Home = (props) => {
  const { completed, actives } = props;
  const dispatch = useDispatch();

  const handleClick = (answer, active) => {
    dispatch(checkAnswer(answer, active));
  }

  return (
    <div>
      Hello from home.
      <div>¿Cómo se dice <span>{`"${actives.map((active) => `${active.e}`)}"`}</span> en español?</div>
      <button type="button" name="answer"
      onClick={() => handleClick('Carro', actives)}>Carro</button>
      <div className="resultDiv"></div>
    </div>
  )
};

export default Home;