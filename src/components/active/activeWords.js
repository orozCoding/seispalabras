import React from "react";
import { checkAnswer } from "../../redux/actives/activesReducer";
import { checkAnswerCompleted } from "../../redux/completed/completedReducer";
import { useDispatch } from "react-redux";

const ActiveWords = (props) => {
  const { actives } = props;
  const dispatch = useDispatch();

  function handleClick(active) {
    const input = document.getElementById(`input-${active.id}`);
    const answer = input.value;

    dispatch(checkAnswer(answer, active, actives));
    dispatch(checkAnswerCompleted(answer, active, actives));

  }

  return (
    <div className="form-container d-flex col">{actives.map((active) => {
      return (
        <form
          id={`form-${active.id}`}
          className="d-flex col"
          key={active.id}
          onSubmit={(e) => {
            e.preventDefault();
            handleClick(active)
          }}>
          <div className="wordTitle rub bold">{active.e.toUpperCase()}</div>
          {!active.completed && (
            <div className="d-flex col form-input-container">
              <input id={`input-${active.id}`} name="answer" type="text" placeholder="... in Spanish"></input>
              <button type="submit" className="click">SEND</button>
            </div>)}
          {active.completed && (<div className="correctText bold">Correct!</div>)}
        </form>
      )
    })}
    </div>
  )
};

export default ActiveWords;