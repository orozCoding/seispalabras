import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getLeaderboard } from "../redux/leaderboardSlice";

const Leaderboard = () => {
  const leaderboardSlice = useSelector((state) => state.leaderboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderboard());
  }, []);

  return (
    <section className="completed-container d-flex col">
      <p className="title bold">Top Translators</p>
      {leaderboardSlice.leaderboard.length > 0 && (
        <>
          {leaderboardSlice.leaderboard.map((user, index) => {
            return (
              <div>
                <span>{index + 1}.</span> <span>{user.username} -</span> <span>{user.translations_count}</span>
              </div>
            );
          })}
        </>
      )}
    </section>
  );
};

export default Leaderboard;
