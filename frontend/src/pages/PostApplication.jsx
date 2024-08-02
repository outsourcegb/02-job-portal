import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  clearAllApplicationErrors,
  postApplication,
  resetAllApplicationSlice,
} from '../slices/application.slice';
import { toast } from 'react-toastify';
import { fetchSingleJob } from '../slices/jobSlice';

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.job);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, message, error } = useSelector((state) => state.application);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
  const [resume, setResume] = useState(user && user.resume && user.resume.url);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jobId } = useParams();

  console.log(user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAllApplicationSlice());
    }
    if (!isAuthenticated) {
      navigate('/login');
    }
    if (user && user.role === 'Employer') {
      navigate('/dashboard');
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(fetchSingleJob(jobId));
  }, []);

  let qualification = [];
  let responsibilities = [];
  let offerings = [];

  if (singleJob.qualification) {
    qualification = singleJob.qualification.split('. ');
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split('. ');
  }
  if (singleJob.offerings) {
    offerings = singleJob.offerings.split('. ');
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handlePostApplication = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('coverLetter', coverLetter);
    formData.append('address', address);

    if (resume) {
      formData.append('resume', resume);
    }

    dispatch(postApplication(formData, jobId));
  };

  return (
    <div className='container mt-5'>
      <h2 className='mb-4'>Apply for {singleJob.title}</h2>
      <form onSubmit={handlePostApplication}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='phone' className='form-label'>
            Phone
          </label>
          <input
            type='text'
            className='form-control'
            id='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='address' className='form-label'>
            Address
          </label>
          <input
            type='text'
            className='form-control'
            id='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='coverLetter' className='form-label'>
            Cover Letter
          </label>
          <textarea
            className='form-control'
            id='coverLetter'
            rows='3'
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          ></textarea>
        </div>
        <div className='mb-3'>
          <label htmlFor='resume' className='form-label'>
            Resume
          </label>
          <input
            type='file'
            className='form-control'
            id='resume'
            onChange={resumeHandler}
          />
        </div>
        <button type='submit' className='btn btn-primary' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default PostApplication;
