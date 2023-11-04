/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import { filterAnswer, filterCorrectAnswers } from "../words/wordFilters";
import { createTranslation } from "../../redux/userSlice";

const WordForm = (props) => {
  const { word } = props;
  const [translated, setTranslated] = useState(word.translated);
  const token = useSelector((state) => state.user.student.token);
  const sound = useSelector((state) => state.sound);

  const dispatch = useDispatch();

  const [playCorrect] = useSound("correct.wav", { volume: 1 });

  const [playWrong] = useSound("wrong.mp3", { volume: 0.5 });

  const checkAnswer = (answer) => {
    const filteredAnswer = filterAnswer(answer);
    const correctAnswers = filterCorrectAnswers(filteredAnswer, word);

    const correctWord = correctAnswers.find((correct) => correct === filteredAnswer);

    if (correctWord) {
      const object = {
        used_word: correctWord,
        word_id: word.id,
      };
      dispatch(createTranslation(object));
      setTranslated(true);
      if (sound) playCorrect();
      return true;
    } else {
      if (sound) playWrong();
      return false;
    }
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
      {translated ? (
        <div className="correctText bold">Correct!</div>
      ) : (
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
    </form>
  );
};

export default WordForm;
