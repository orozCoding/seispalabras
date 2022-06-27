import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ActiveWords from '../components/active/activeWords';
import SampleWordForm from '../components/active/sampleWordForm';

const Home = () => {
  const actives = useSelector((state) => state.actives);
  const user = useSelector((state) => state.user);

  const checkFinished = () => {
    let finished = true;
    actives.forEach((word) => {
      if (word.completed === false) {
        finished = false;
      }
    });
    return finished;
  };

  const countUncompleted = (actives) => {
    let n = 0;
    actives.forEach((active) => {
      if (!active.completed) {
        n += n;
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
        {' '}
        {`${countUncompleted(actives)} more to go...`}
        {' '}
      </div>
    );
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
              {renderProgress(actives)}
            </div>
          </>
        )
        : (
          <>
            <p className="title bold">Seis Palabras Diarias</p>
            <p>Practice and improve your Spanish vocabulary translating six words every day!</p>
            <p>
              The idea of
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
              <NavLink to="/signup" className="myLink">Sing Up</NavLink>
              {' '}
              to
              start practicing your Spanish with 6 new words daily.
            </div>
          </>
        )}

    </section>
  );
};

export default Home;
