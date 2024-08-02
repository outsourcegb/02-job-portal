import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAllUserErrors, register } from '../slices/user.slice.js';
import { toast } from 'react-toastify';

const Register = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [firstNiche, setFirstNiche] = useState('');
  const [secondNiche, setSecondNiche] = useState('');
  const [thirdNiche, setThirdNiche] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState('');

  const { user, loading, error, isAuthenticated, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nichesArray = [
    'Software Development',
    'Web Development',
    'Cybersecurity',
    'Data Science',
    'Artificial Intelligence',
    'Cloud Computing',
    'DevOps',
    'Mobile App Development',
    'Blockchain',
    'Database Administration',
    'Network Administration',
    'UI/UX Design',
    'Game Development',
    'IoT (Internet of Things)',
    'Big Data',
    'Machine Learning',
    'IT Project Management',
    'IT Support and Helpdesk',
    'Systems Administration',
    'IT Consulting',
  ];

  const handleResume = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResume(reader.result);
    };
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('role', role);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('address', address);

    if (role === 'Job Seeker') {
      formData.append('firstNiche', firstNiche);
      formData.append('secondNiche', secondNiche);
      formData.append('thirdNiche', thirdNiche);
      formData.append('coverLetter', coverLetter);
      formData.append('resume', resume);
    }

    dispatch(register(formData));
  };
  const handleFileChange = (e) => setResume(e.target.files[0]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [dispatch, loading, error, isAuthenticated, message]);

  const renderNicheDropdowns = (role) => {
    if (role === 'Job Seeker') {
      return (
        <div className='row mb-3'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='firstNiche'>First Niche</label>
              <select
                className='form-control'
                id='firstNiche'
                value={firstNiche}
                onChange={(e) => setFirstNiche(e.target.value)}
              >
                {nichesArray.map((niche, index) => (
                  <option key={index} value={niche}>
                    {niche}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='secondNiche'>Second Niche</label>
              <select
                className='form-control'
                id='secondNiche'
                value={secondNiche}
                onChange={(e) => setSecondNiche(e.target.value)}
              >
                {nichesArray.map((niche, index) => (
                  <option key={index} value={niche}>
                    {niche}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='thirdNiche'>Third Niche</label>
              <select
                className='form-control'
                id='thirdNiche'
                value={thirdNiche}
                onChange={(e) => setThirdNiche(e.target.value)}
              >
                {nichesArray.map((niche, index) => (
                  <option key={index} value={niche}>
                    {niche}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h4 className='mb-4'>Register</h4>
            <hr className='py-2' />
            <form onSubmit={handleRegister}>
              <div className='form-group mb-3'>
                <label className='me-5'>Select Role</label>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='role'
                    id='roleEmployer'
                    value='Employer'
                    checked={role === 'Employer'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label className='form-check-label' htmlFor='roleEmployer'>
                    Employer
                  </label>
                </div>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='role'
                    id='roleJobSeeker'
                    value='Job Seeker'
                    checked={role === 'Job Seeker'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label className='form-check-label' htmlFor='roleJobSeeker'>
                    Job Seeker
                  </label>
                </div>
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='row mb-3'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      className='form-control'
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                      type='text'
                      className='form-control'
                      id='phone'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='address'>Address</label>
                <input
                  type='text'
                  className='form-control'
                  id='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              {role === 'Job Seeker' && (
                <div className='form-group mb-3'>
                  <label htmlFor='resume'>Upload Resume</label>
                  <input
                    type='file'
                    className='form-control'
                    id='resume'
                    onChange={handleFileChange}
                  />
                </div>
              )}
              {renderNicheDropdowns(role)}
              {/* Add other fields as needed */}
              <button type='submit' className='btn btn-primary'>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
