import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTranslations, getWords } from "../redux/userSlice";

const Completed = () => {
  const user = useSelector((state) => state.user);
  const translatedWords = useSelector((state) => state.user.translated_words);
  const [wordsInOrder, setWordsInOrder] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.logged) {
      dispatch(getTranslations());
    }
  }, []);

  useEffect(() => {
    // We want to show the latest translated word first
    // and add the new ones to the top
    // In the back-end, the words are sorted by id, meaning the latest word is the last one
    // So we reverse the array and use that instead
    if (translatedWords) {
      setWordsInOrder([...translatedWords].reverse());
    }
  }, [translatedWords]);

  let i = translatedWords.length + 1;

  return (
    <section className="completed-container d-flex col">
      <p className="title bold">Completed Words</p>
      {user.logged && translatedWords ? (
        <>
          {translatedWords.length > 0 ? (
            <p>Your translations:</p>
          ) : (
            <p>After translating the first word, the completed ones will be stored here.</p>
          )}
          <div className="completedWords d-flex col">
            {wordsInOrder.map((word) => {
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
