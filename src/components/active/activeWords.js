import React from "react";
import WordForm from "./wordForm";

const ActiveWords = (props) => {
  const { actives } = props;

  return (
    <div className="form-container d-flex col">{actives.map((active) => {
      return (
        <WordForm key={active.id} actives={actives} active={active} />
      )
    })}
    </div>
  )
};

export default ActiveWords;