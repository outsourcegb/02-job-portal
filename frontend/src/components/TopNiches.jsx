import React from 'react';

const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: 'Software Development',
      description:
        'Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards.',
    },
    {
      id: 2,
      service: 'Web Development',
      description:
        'Comprehensive web development solutions from front-end design to back-end integration, delivering responsive and user-friendly websites.',
    },
    {
      id: 3,
      service: 'Data Science',
      description:
        'Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.',
    },
    {
      id: 4,
      service: 'Cloud Computing',
      description:
        'Reliable cloud computing services to manage, store, and process data efficiently, offering scalable and flexible cloud solutions.',
    },
    {
      id: 5,
      service: 'DevOps',
      description:
        'DevOps services to streamline software development and operations, enhancing deployment efficiency and reducing time to market.',
    },
    {
      id: 6,
      service: 'Mobile App Development',
      description:
        'Expert mobile app development for iOS and Android platforms, creating intuitive and engaging mobile experiences for your users.',
    },
  ];

  return (
    <div className='my-5 py-2'>
      <h4>Top Niches</h4>
      <div className='row'>
        {services.map((service) => {
          return (
            <div
              key={service.id}
              className='col-12 col-sm-6 col-md-4 col-lg-4 mb-3'
            >
              <div className='card h-100'>
                <div className='card-body d-flex flex-column justify-content-between'>
                  <h5 className='card-title'>{service.service}</h5>
                  <p className='card-text'>{service.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopNiches;
