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

  const renderProgress = () => {
    if (checkFinished()) {
      return (
        <div>
          <p>You finished!</p>
          <p>You finished!</p>
          </div>
      )
    }
    return <div> Finish the words! </div>
  }

  return (
    <div>
      <p>Tres Palabras Diarias (Three daily words)</p>
      <div>Traduce al español las siguientes palabras:</div>
      <ActiveWords actives={actives} />
      <div>
        {renderProgress()}
      </div>
      <div className="resultDiv"></div>
    </div>
  )
};

export default Home;