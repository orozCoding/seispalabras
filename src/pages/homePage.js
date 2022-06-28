/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ActiveWords from '../components/active/activeWords';
import SampleWordForm from '../components/active/sampleWordForm';
import { volumeOFF, volumeON } from '../redux/soundSlice';

const Home = () => {
  const actives = useSelector((state) => state.actives);
  const user = useSelector((state) => state.user);
  const sound = useSelector((state) => state.sound);

  const dispatch = useDispatch();

  const checkFinished = () => {
    let finished = true;
    actives.forEach((word) => {
      if (word.completed === false) {
        finished = false;
      }
    });
    return finished;
  };

  const countUncompleted = () => {
    let n = 0;
    actives.forEach((active) => {
      if (!active.completed) {
        n += 1;
      }
    });
    return n;
  };

  const renderProgress = () => {
    if (checkFinished()) {
      return (
        <div>
          <p>Congratulations!</p>
          <p>You finished today.</p>
          <p className="finalMsg">New words tomorrow!</p>
        </div>
      );
    }
    return (
      <div>
        {`${countUncompleted()} more to go...`}
      </div>
    );
  };

  const handleSound = () => {
    if (sound) {
      dispatch(volumeOFF());
    } else {
      dispatch(volumeON());
    }
  };

  return (
    <section id="home-container" className="home-container d-flex col">
      {user.logged
        ? (
          <>
            <p className="title bold">Seis Palabras Diarias</p>
            <p>Type a Spanish word for:</p>
            <ActiveWords actives={actives} />
            <div>
              {renderProgress()}
            </div>
          </>
        )
        : (
          <>
            <p className="title bold">Seis Palabras Diarias</p>
            <p>Practice and improve your Spanish vocabulary translating six words every day!</p>
            <p>
              The idea of
              {' '}
              <strong className="yellow">Seis Palabras</strong>
              {' '}
              is to help you create a habit that will help you improve your Spanish.
            </p>
            <p>Sample:</p>
            <p>Type a Spanish word for...</p>
            <SampleWordForm />
            <div>
              <NavLink to="/login" className="myLink">Log In</NavLink>
              {' '}
              or
              {' '}
              <NavLink to="/signup" className="myLink">Sign Up</NavLink>
              {' '}
              to
              start practicing your Spanish with 6 new words daily.
            </div>
          </>
        )}
      <p className="mute-sound-text click" onClick={handleSound}>
        {sound ? 'Mute Sound' : 'Activate Sound'}
      </p>

    </section>
  );
};

export default Home;
