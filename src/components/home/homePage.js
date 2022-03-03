import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCompleted } from "../../redux/completed/completedReducer";
import { getActiveWords, checkAnswer } from "../../redux/actives/activesReducer";

const Home = (props) => {
  const { actives } = props;
  const dispatch = useDispatch();

  function handleClick(active) {
    const input = document.getElementById(`input-${active.id}`);
    const answer = input.value;
    dispatch(checkAnswer(answer, active, actives));
    if (active.s.includes(answer.toLowerCase())) {
      dispatch(addCompleted(active));
    }
  }

  return (
    <div>
      Tres Palabras Diarias (Three daily words)
      <div>¿Cómo se dicen en español las siguientes palabras?</div>
      <div>{actives.map((active) => {
        return (
          <form
            id={`form-${active.id}`}
            key={active.id}
            onSubmit={(e) => {
              e.preventDefault();
              handleClick(active)
            }}>
            <div>{active.e}</div>
            <input id={`input-${active.id}`} name="answer" type="text"></input>
            <button type="submit">submit</button>
          </form>
        )
      })}
      </div>
      <button type="button" name="answer"
        onClick={(e) => handleClick('ordenador', actives, e)}>ordenador</button>
      <div className="resultDiv"></div>
    </div>
  )
};

export default Home;