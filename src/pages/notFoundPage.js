import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found-container d-flex col">
    <i className="bi bi-question-diamond notFound" />
    <p>Page not found.</p>
    <Link to="/" className="myLink">GO BACK HOME</Link>
  </div>
);

export default NotFound;
