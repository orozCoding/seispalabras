import React, { useEffect, useState } from "react";
import { checkAnswer } from "../../redux/actives/activesReducer";
import { checkAnswerCompleted } from "../../redux/completed/completedReducer";
import { useDispatch } from "react-redux";


const WordForm = (props) => {
  const { actives, active } = props;
  const [tried, setTried] = useState('');

  const dispatch = useDispatch();

  const handleClick = (active) => {
    const input = document.getElementById(`input-${active.id}`);
    const answer = input.value;
    
    dispatch(checkAnswer(answer, active, actives));
    dispatch(checkAnswerCompleted(answer, active));
   
    if(!active.completed) {
      setTried('tried');
    } else {setTried(''); }
    
  }

  return (
    <form
      id={`form-${active.id}`}
      className={`d-flex col ${tried}`}
      key={active.id}
      onSubmit={(e) => {
        e.preventDefault();
        handleClick(active)
      }}>
      <div className="wordTitle rub bold">{active.e.toUpperCase()}</div>
      {!active.completed && (
        <div className="d-flex col form-input-container">
          <input id={`input-${active.id}`} name="answer" type="text" placeholder="... in Spanish" className={tried}></input>
          <button type="submit" className={`click formButton ${tried}`}>SUBMIT</button>
        </div>)}
      {active.completed && (<div className="correctText bold">Correct!</div>)}
    </form>
  )
};

export default WordForm;