/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import { filterAnswer, filterCorrectAnswers } from "../words/wordFilters";
import { addCompleted } from "../../redux/completedSlice";
import { fetchCreateTranslation } from "../../redux/shared/fetchCreateTranslation";

const WordForm = (props) => {
  const { word } = props;
  const token = useSelector((state) => state.user.student.token);
  const sound = useSelector((state) => state.sound);

  const dispatch = useDispatch();

  const [playCorrect] = useSound("correct.wav", { volume: 1 });

  const [playWrong] = useSound("wrong.mp3", { volume: 0.5 });

  const checkAnswer = (answer) => {
    const filteredAnswer = filterAnswer(answer);
    const correctAnswers = filterCorrectAnswers(filteredAnswer, word);

    const correctWord = correctAnswers.find((correct) => correct === filteredAnswer);

    if (correctAnswers.includes(filteredAnswer)) {
      dispatch(fetchCreateTranslation({ word, token }));
      dispatch(addCompleted({ word, token }));
      if (sound) {
        playCorrect();
      }
      return true;
    }
    if (sound) {
      playWrong();
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = e.target.answer.value;
    checkAnswer(answer);
  };

  const checkTries = () => {
    if (word.tried) {
      return "tried";
    }
    return "";
  };

  return (
    <form
      id={`form-${word.id}`}
      className={`d-flex col ${checkTries()} word-form`}
      key={word.id}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className="wordTitle rub bold">{word.e.toUpperCase()}</div>
      {!word.completed && (
        <div className="d-flex col form-input-container">
          <input
            id={`input-${word.id}`}
            name="answer"
            type="text"
            placeholder="... in Spanish"
            className={checkTries()}
            autoComplete="off"
          />
          <button type="submit" className={`click formButton ${checkTries()}`}>
            SUBMIT
          </button>
        </div>
      )}
      {word.completed && <div className="correctText bold">Correct!</div>}
    </form>
  );
};

export default WordForm;
