import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCompleted } from "../../redux/completed/completedReducer";
import { getActiveWords, checkAnswer } from "../../redux/actives/activesReducer";

const Home = (props) => {
  const { actives } = props;
  const dispatch = useDispatch();

  const handleClick = (answer, actives) => {
    dispatch(checkAnswer(answer, actives));
    if(actives[0].s.includes(answer.toLowerCase())){
      dispatch(addCompleted(actives));
    }
  }

  return (
    <div>
      Tres Palabras Diarias
      (Three daily words)
      <div>¿Cómo se dice <span>{`"${actives.map((active) => `${active.e}`)}"`}</span> en español?</div>
      <button type="button" name="answer"
      onClick={() => handleClick('Carro', actives)}>Carro</button>
      <div className="resultDiv"></div>
    </div>
  )
};

export default Home;