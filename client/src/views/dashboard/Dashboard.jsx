import React from 'react';
import PropTypes from 'prop-types';
import FooterDesktop from '../../components/footers/FooterDesktop';
import Alert from '../../components/layouts/Alert';

const Dashboard = () => {
  return (
    <>
      <div className='mx-auto px-4 h-full mt-24 md:mt-16 mb-24 md:mb-16'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'></div>
          </div>
        </div>
      </div>
      <FooterDesktop />
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
