import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAllUserErrors, login } from '../slices/user.slice';
import { toast } from 'react-toastify';

const Login = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, message, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('role', role);
    formData.append('email', email);
    formData.append('password', password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isAuthenticated) {
      nagivate('/dashboard');
    }
  }, [dispatch, login, error, isAuthenticated]);

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-12'>
          <h4 className='mb-4'>Login</h4>
          <hr className='py-2' />

          {error && <div className='alert alert-danger'>{error}</div>}
          {message && <div className='alert alert-success'>{message}</div>}
          <form onSubmit={handleLogin}>
            <div className='form-group mb-4'>
              <label className='me-4'>Role</label>

              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='role'
                  id='employer'
                  value='Employer'
                  checked={role === 'Employer'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label className='form-check-label' htmlFor='employer'>
                  Employer
                </label>
              </div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='role'
                  id='jobSeeker'
                  value='Job Seeker'
                  checked={role === 'Job Seeker'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label className='form-check-label' htmlFor='jobSeeker'>
                  Job Seeker
                </label>
              </div>
            </div>
            <div className='form-group mb-4'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group mb-4'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='btn btn-primary btn-block'
              style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
