import React from 'react';
import {Link} from 'react-router-dom';

const Error404Page = () => {
  return (
    <>
      <h1>
        Error 404
        <br />
        Not Found
      </h1>
      <Link to="/">Home page</Link>
    </>
  );
};

export default Error404Page;
