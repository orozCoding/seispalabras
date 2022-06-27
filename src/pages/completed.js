import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Completed = () => {
  const user = useSelector((state) => state.user);
  const completed = useSelector((state) => state.completed);

  let i = completed.length + 1
  
  return (
    <section className="completed-container d-flex col">
      <p className="title bold">Completed Words</p>
      {user.logged ?
      <>
        {completed.length > 0 && (<p>Check the words you have translated:</p>)}
      {!completed.length && (<p>After translating the first word, the completed ones will be stored here.</p>)}
      <div className="completedWords d-flex col">{completed.map((word) => {
        i -= 1;
        return (
          <div key={word.id} className="d-flex col">
            <p>{i}. <span className="completedWord">{word.e.toUpperCase()}</span> in Spanish can be:</p>
            {word.s.length > 1 && (<p><span className="possibleWord">{word.s.join(', ')}</span> and more.</p>)}
            {word.s.length < 2 && (<p><span className="possibleWord">{word.s.join(', ')}</span>.</p>)}
          </div>
        )
        
      })}
      </div>
      </>
      :
      <>
        <div><NavLink to='/login' className="myLink">Log In</NavLink> or <NavLink to='/signup' className="myLink">Sing Up</NavLink> to
         start tracking all the words you translate.
        </div>
      </>}
      
    </section>
  )
}

export default Completed;