import React from "react";

const Completed = (props) => {
  const { completed } = props;

  return (
    <section className="completed-container d-flex col">
      <p className="title bold">Completed Words</p>
      <p>Check the words you have translated:</p>
      <div className="completedWords d-flex col">{completed.map((word) => {
        return (
          <div key={word.id} className="d-flex col">
            <p><span className="completedWord">{word.e.toUpperCase()}</span> in Spanish can be:</p>
            <p>{word.s.join(', ')} and more.</p>
          </div>
        )
      })}
      <p>Comeback tomorrow and play with more words.</p></div>
    </section>
  )
}

export default Completed;