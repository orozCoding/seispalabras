import React from "react";
import { useDispatch } from "react-redux";
import { addCompleted } from "../../redux/completed/completedReducer";
import { checkAnswer } from "../../redux/actives/activesReducer";

const Home = (props) => {
  const { actives } = props;
  const dispatch = useDispatch();

  function handleClick(active) {
    const input = document.getElementById(`input-${active.id}`);
    const answer = input.value;

    let correctAnswers = [];
    active.s.forEach((word) => {
      word = word.normalize("NFD").replace(/\p{Diacritic}/gu, "")
      word = word.toLowerCase();
      correctAnswers.push(word);
    })

    dispatch(checkAnswer(answer, active, actives));
    if (correctAnswers.includes(answer.toLowerCase())) {
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
      <div className="resultDiv"></div>
    </div>
  )
};

export default Home;