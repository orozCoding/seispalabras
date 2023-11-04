import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTranslations, getWords } from "../redux/userSlice";

const Completed = () => {
  const user = useSelector((state) => state.user);
  const completed = useSelector((state) => state.user.translated_words);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.logged) {
      dispatch(getTranslations());
      dispatch(getWords());
    }
  }, []);

  let i = completed.length + 1;

  return (
    <section className="completed-container d-flex col">
      <p className="title bold">Completed Words</p>
      {user.logged && completed ? (
        <>
          {completed.length > 0 ? (
            <p>Your translations:</p>
          ) : (
            <p>After translating the first word, the completed ones will be stored here.</p>
          )}
          <div className="completedWords d-flex col">
            {completed.map((word) => {
              i -= 1;
              return (
                <div key={word.word_id} className="d-flex col completedWordContainer">
                  <p>
                    {i}. <span className="completedWord">{word.word.toUpperCase()}</span> means{" "}
                    <span className="possibleWord">{word.used_word.toUpperCase()}</span>
                  </p>

                  {word.alternative_answers.length > 0 && (
                    <p>
                      (also <span className="possibleWord">{word.alternative_answers.join(", ")}</span>)
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div>
            <NavLink to="/login" className="myLink">
              Log In
            </NavLink>{" "}
            or{" "}
            <NavLink to="/signup" className="myLink">
              Sign Up
            </NavLink>{" "}
            to start tracking all the words you translate.
          </div>
        </>
      )}
    </section>
  );
};

export default Completed;
