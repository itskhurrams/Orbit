import React from 'react';
import { Link } from 'react-router-dom';

const NavbarPublic = () => {
  return (
    <nav className='top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow'>
      <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
        <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
          <Link
            to='/'
            className='text-blueGray-700 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap tracking-widest'
          >
            W E L T Y ~{' '}
            <span className='text-xs font-normal'>your voice matters</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default NavbarPublic;
