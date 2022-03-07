import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container d-flex col">
      <i class="bi bi-question-diamond notFound"></i>
      <p>Page not found.</p>
      <Link to="/" className="myLink">GO BACK HOME</Link>
    </div>
  )
};

export default NotFound;