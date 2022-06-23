import React from "react";
import { filterGuess, filterCorrectAnswers } from "../words/wordFilters"
import { useDispatch } from "react-redux";
import { addCompleted } from "../../redux/completedSlice";
import { completeActiveWord, wrongGuess } from "../../redux/activesSlice";

const WordForm = (props) => {
  const { actives, active } = props;

  const dispatch = useDispatch();

  const checkAnswer = (answer, active) => {
    answer = filterGuess(answer);
    let correctAnswers = filterCorrectAnswers(answer, active);
    if (correctAnswers.includes(answer)) {
      dispatch(completeActiveWord(active));
      dispatch(addCompleted(active));
      return true;
    }
    dispatch(wrongGuess(active));
    return false;
  };

  const handleClick = (active) => {

    const input = document.getElementById(`input-${active.id}`);
    const answer = input.value;

    checkAnswer(answer, active, actives);

  };

  const checkTries = () => {
    if (active.tried) {
      return 'tried';
    }
    return '';
  };

  return (
    <form
      id={`form-${active.id}`}
      className={`d-flex col ${checkTries()}`}
      key={active.id}
      onSubmit={(e) => {
        e.preventDefault();
        handleClick(active)
      }}
      autoComplete="off">
      <div className="wordTitle rub bold">{active.e.toUpperCase()}</div>
      {!active.completed && (
        <div className="d-flex col form-input-container">
          <input id={`input-${active.id}`} name="answer" type="text" placeholder="... in Spanish" className={checkTries()} autoComplete="off" />
          <button type="submit" className={`click formButton ${checkTries()}`}>SUBMIT</button>
        </div>)}
      {active.completed && (<div className="correctText bold">Correct!</div>)}
    </form>
  )
};

export default WordForm;