import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useSound from 'use-sound';
import { filterGuess, filterCorrectAnswers } from '../words/wordFilters';

const SampleWordForm = () => {
  const sound = useSelector((state) => state.sound);

  const sample = {
    id: 143,
    e: 'love',
    s: ['amor'],
    completed: false,
    active: false,
  };

  const [active, setActive] = useState(sample);

  const [playCorrect] = useSound(
    'correct.wav',
    { volume: 1 },
  );

  const [playWrong] = useSound(
    'wrong.mp3',
    { volume: 0.5 },
  );

  const checkAnswer = (input) => {
    const answer = filterGuess(input);
    const correctAnswers = filterCorrectAnswers(answer, active);
    if (correctAnswers.includes(answer)) {
      setActive({ ...sample, completed: true });
      if (sound) {
        playCorrect();
      }
      return true;
    }
    setActive({ ...sample, tried: true });
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

export default SampleWordForm;
