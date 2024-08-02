import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../slices/user.slice';
import { toast } from 'react-toastify';

const NavBar = () => {
  const { error, user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
  };

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          02 Job Portal
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav m-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to={'/'}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to={'/jobs'}>
                Jobs
              </Link>
            </li>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Dropdown
              </a>
              <ul className='dropdown-menu'>
                <li>
                  <Link className='dropdown-item' to={'/'}>
                    Action
                  </Link>
                </li>
                <li>
                  <a className='dropdown-item' href='#'>
                    Another action
                  </a>
                </li>
                <li>
                  <hr className='dropdown-divider' />
                </li>
                <li>
                  <a className='dropdown-item' href='#'>
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className='navbar-nav ml-auto'>
            {isAuthenticated ? (
              <li className='nav-item'>
                <Link className='nav-link' onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to={'/login'}>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to={'/register'}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
