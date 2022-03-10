import React from "react";
import ActiveWords from "../components/active/activeWords";

const Home = (props) => {
  const { actives } = props;

  const checkFinished = () => {
    for (let i = 0; i < actives.length; i++) {
      if (actives[i].completed === false) {
        return false;
      }
    }
    return true;
  }

  const countUncompleted = (actives) => {
    let n = 0;
    actives.forEach((active) => {
      if (!active.completed) {
        n = n + 1;
      }
    })
    return n;
  }

  const renderProgress = () => {
    if (checkFinished()) {
      return (
        <div>
          <p>Congratulations!</p>
          <p>You finished today.</p>
          <p className="finalMsg">New words tomorrow!</p>
        </div>
      )
    }
    return <div> { `${countUncompleted(actives)} more to go...` } </div>
  }

  return (
    <section id="home-container" className="d-flex col">
      <p className="title bold">Seis Palabras Diarias</p>
      <p>Type a Spanish word for:</p>
      <ActiveWords actives={actives} />
      <div>
        {renderProgress(actives)}
      </div>
      <div className="resultDiv"></div>
    </section>
  )
};

export default Home;