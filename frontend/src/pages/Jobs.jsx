import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearAllJobErrors, fetchJobs } from '../slices/jobSlice.js';
import Spinner from '../components/Spinner.jsx';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [niche, setNiche] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const dispatch = useDispatch();

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

  const cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Ahmedabad',
    'Chennai',
    'Kolkata',
    'Surat',
    'Pune',
    'Jaipur',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Indore',
    'Thane',
    'Bhopal',
    'Visakhapatnam',
    'Patna',
    'Vadodara',
    'Ghaziabad',
  ];

  const { jobs, loading, error } = useSelector((state) => state.job);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setSelectedCity(e.target.value);
  };

  const handleNicheChange = (e) => {
    setNiche(e.target.value);
    setSelectedNiche(e.target.value);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }

    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, error, city, niche]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

  return (
    <>
      {loading ? (
        <div className='text-center my-3'>
          <Spinner animation='border' />
        </div>
      ) : (
        <div className='container py-5'>
          <div className='row'>
            <div className='col-md-3'>
              <div className='mb-4'>
                <h4 className='border-bottom pb-2'>Search Jobs</h4>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search for jobs'
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <h5 className='border-bottom pb-2'>Select City</h5>
                {cities.map((city) => (
                  <div className='form-check' key={city}>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='city'
                      value={city}
                      id={`city-${city}`}
                      onChange={handleCityChange}
                      checked={selectedCity === city}
                    />
                    <label
                      className='form-check-label'
                      htmlFor={`city-${city}`}
                    >
                      {city}
                    </label>
                  </div>
                ))}
              </div>

              <div className='mb-4'>
                <h5 className='border-bottom pb-2'>Select Niche</h5>
                {nichesArray.map((niche) => (
                  <div className='form-check' key={niche}>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='niche'
                      value={niche}
                      id={`niche-${niche}`}
                      onChange={handleNicheChange}
                      checked={selectedNiche === niche}
                    />
                    <label
                      className='form-check-label'
                      htmlFor={`niche-${niche}`}
                    >
                      {niche}
                    </label>
                  </div>
                ))}
              </div>

              <div className='mt-4'>
                <button
                  className='btn btn-primary w-100'
                  onClick={handleSearch}
                >
                  <FaSearch className='me-2' /> Search
                </button>
              </div>
            </div>
            <div className='col-md-9'>
              {jobs.length > 0 ? (
                <div className='row'>
                  {jobs.map((job) => (
                    <div key={job._id} className='col-md-6 mb-3'>
                      <div className='card'>
                        <div className='card-body'>
                          <p>
                            {job.hiringMultipleCandidates ? (
                              <span className='badge bg-info'>
                                Hiring Multiple Locations
                              </span>
                            ) : (
                              <span className='badge bg-info'>Hiring</span>
                            )}
                          </p>
                          <h5 className='card-title'>{job.title}</h5>
                          <p className='card-text'>{job.description}</p>
                          <p className='card-text'>
                            <strong>City:</strong> {job.location}
                          </p>
                          <p className='card-text'>
                            <strong>Niche:</strong> {job.jobNiche}
                          </p>
                          <p className='card-text'>
                            <strong>Posted On:</strong>{' '}
                            {new Date(job.createdAt).toLocaleDateString()}
                          </p>
                          <div className='d-flex justify-content-end'>
                            <Link
                              to={`/post/application/${job._id}`}
                              className='btn btn-link'
                            >
                              Apply Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No jobs found for the selected criteria.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Jobs;
