import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='footer mt-auto py-3 bg-light text-dark'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <h5>Quick Links</h5>
            <ul className='list-unstyled'>
              <li>
                <a href='/' className='text-dark'>
                  Home
                </a>
              </li>
              <li>
                <a href='/jobs' className='text-dark'>
                  Jobs
                </a>
              </li>
            </ul>
          </div>
          <div className='col-md-4'>
            <h5>Support</h5>
            <ul className='list-unstyled'>
              <li>Address: 1234 Street Name, City, Country</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: support@example.com</li>
            </ul>
          </div>
          <div className='col-md-4'>
            <div className='d-flex align-items-center justify-content-end'>
              <h5 className='me-4 mb-0'>Follow Us</h5>
              <div className='mx-2'>
                <a href='#' className='text-dark'>
                  <FaFacebook size={24} className='text-primary' />
                </a>
              </div>
              <div className='mx-2'>
                <a href='#' className='text-dark'>
                  <FaTwitter size={24} className='text-primary' />
                </a>
              </div>
              <div className='mx-2'>
                <a href='#' className='text-dark'>
                  <FaLinkedin size={24} className='text-primary' />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-12'>
            <p>
              &copy; {new Date().getFullYear()} Your Company. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
