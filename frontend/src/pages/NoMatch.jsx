import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <h1 className='display-1'>404</h1>
      <h2 className='mb-4'>Page Not Found</h2>
      <p className='lead mb-4'>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to='/' className='btn btn-primary'>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NoMatch;
