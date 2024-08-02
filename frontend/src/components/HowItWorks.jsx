import React from 'react';
import { LuUserPlus } from 'react-icons/lu';
import { VscTasklist } from 'react-icons/vsc';
import { BiSolidLike } from 'react-icons/bi';

const HowItWorks = () => {
  return (
    <div className='my-5'>
      <div className='container'>
        <h3 className='text-center mb-4'>How does it work?</h3>

        <div className='row mb-4'>
          <div className='col-md-12'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='icon mb-3'>
                  <LuUserPlus size={40} />
                </div>
                <h4 className='card-title'>Create an Account</h4>
                <p className='card-text'>
                  Sign up for a free account as a job seeker or employer. Set up
                  your profile in minutes to start posting jobs or applying for
                  jobs. Customize your profile to highlight your skills or
                  requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='row mb-4'>
          <div className='col-md-12'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='icon mb-3'>
                  <VscTasklist size={40} />
                </div>
                <h4 className='card-title'>Post or Browse Jobs</h4>
                <p className='card-text'>
                  Employers can post detailed job descriptions, and job seekers
                  can browse a comprehensive list of available positions.
                  Utilize filters to find jobs that match your skills and
                  preferences.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='row mb-4'>
          <div className='col-md-12'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='icon mb-3'>
                  <BiSolidLike size={40} />
                </div>
                <h4 className='card-title'>Hire or Get Hired</h4>
                <p className='card-text'>
                  Employers can shortlist candidates and extend job offers. Job
                  seekers can review job offers and accept positions that align
                  with their career goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
