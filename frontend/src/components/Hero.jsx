import React from 'react';

const Hero = () => {
  return (
    <div className='jumbotron text-center py-5 border rounded px-5'>
      <h1 className='display-4'>Find Your Dream Job Today</h1>
      <p className='lead'>
        Explore thousands of job listings from top companies and find the
        perfect fit for you.
      </p>
      <hr className='my-4' />
      <p>
        Sign up now to get personalized job recommendations and career advice.
      </p>
      <a className='btn btn-primary btn-lg' href='#' role='button'>
        Get Started
      </a>
      <a className='btn btn-secondary btn-lg ms-2' href='#' role='button'>
        Learn More
      </a>
    </div>
  );
};

export default Hero;
