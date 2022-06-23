import React from "react";
import { useSelector } from "react-redux";
import WordForm from "./wordForm";

const ActiveWords = () => {
  const actives = useSelector((state) => state.actives);

  return (
    <div className="form-container d-flex col">{actives.map((active) => {
      return (
        <WordForm key={active.id} active={active} />
      )
    })}
    </div>
  )
};

export default ActiveWords;