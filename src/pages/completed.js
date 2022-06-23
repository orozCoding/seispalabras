import React from "react";
import { useSelector } from "react-redux";

const Completed = () => {
  const completed = useSelector((state) => state.completed);
  
  let i = 0;
  return (
    <section className="completed-container d-flex col">
      <p className="title bold">Completed Words</p>
      {completed.length > 0 && (<p>Check the words you have translated:</p>)}
      {!completed.length && (<p>After translating the first word, the completed ones will be stored here.</p>)}
      <div className="completedWords d-flex col">{completed.map((word) => {
        i += 1;
        return (
          <div key={word.id} className="d-flex col">
            <p>{i}. <span className="completedWord">{word.e.toUpperCase()}</span> in Spanish can be:</p>
            {word.s.length > 1 && (<p><span className="possibleWord">{word.s.join(', ')}</span> and more.</p>)}
            {word.s.length < 2 && (<p><span className="possibleWord">{word.s.join(', ')}</span>.</p>)}
          </div>
        )
        
      })}
      <p className="finalMsg">Comeback tomorrow and play with more words.</p></div>
    </section>
  )
}

export default Completed;