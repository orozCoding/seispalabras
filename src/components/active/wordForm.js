/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import { filterGuess, filterCorrectAnswers } from '../words/wordFilters';
import { addCompleted } from '../../redux/completedSlice';
import { completeActiveWord, wrongGuess } from '../../redux/activesSlice';

const WordForm = (props) => {
  const { active } = props;
  const token = useSelector((state) => state.user.student.token);
  const sound = useSelector((state) => state.sound);

  const dispatch = useDispatch();

  const [playCorrect] = useSound(
    'correct.wav',
    { volume: 1 },
  );

  const [playWrong] = useSound(
    'wrong.mp3',
    { volume: 1 },
  );

  const checkAnswer = (answer) => {
    const filteredAnswer = filterGuess(answer);
    const correctAnswers = filterCorrectAnswers(filteredAnswer, active);
    if (correctAnswers.includes(filteredAnswer)) {
      dispatch(completeActiveWord({ active, token }));
      dispatch(addCompleted({ active, token }));
      if (sound) {
        playCorrect();
      }
      return true;
    }
    dispatch(wrongGuess(active));
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
      autoComplete="off"
    >
      <div className="wordTitle rub bold">{active.e.toUpperCase()}</div>
      {!active.completed && (
        <div className="d-flex col form-input-container">
          <input id={`input-${active.id}`} name="answer" type="text" placeholder="... in Spanish" className={checkTries()} autoComplete="off" />
          <button type="submit" className={`click formButton ${checkTries()}`}>SUBMIT</button>
        </div>
      )}
      {active.completed && (<div className="correctText bold">Correct!</div>)}
    </form>
  );
};

export default WordForm;
