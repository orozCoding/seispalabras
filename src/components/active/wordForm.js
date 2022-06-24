import React from "react";
import { filterGuess, filterCorrectAnswers } from "../words/wordFilters"
import { useDispatch } from "react-redux";
import { addCompleted } from "../../redux/completedSlice";
import { completeActiveWord, wrongGuess } from "../../redux/activesSlice";

const WordForm = (props) => {
  const { active } = props;

  const dispatch = useDispatch();

  const checkAnswer = (answer) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = e.target.answer.value
    checkAnswer(answer);
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
      className={`d-flex col ${checkTries()} word-form`}
      key={active.id}
      onSubmit={handleSubmit}
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