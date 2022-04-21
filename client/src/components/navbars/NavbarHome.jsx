import React from 'react';
import { NavLink } from 'react-router-dom';
// import logo from '../../assets/images/logo.png';

const NavbarHome = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav className='top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow'>
      <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
        <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
          <NavLink
            to='/'
            className='text-blueGray-700 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap tracking-widest'
          >
            W E L T Y ~{' '}
            <span className='text-xs font-normal'>your voice matters</span>
          </NavLink>
          <button
            className='cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
            type='button'
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className='fas fa-bars'></i>
          </button>
        </div>
        <div
          className={
            'lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none' +
            (navbarOpen ? ' block' : ' hidden')
          }
          id='example-navbar-warning'
        >
          <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
            <li className='flex items-center'> </li>
            <li className='flex items-center'>
              <NavLink
                className='hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs font-bold'
                to='/CompanySignup'
              >
                Sign up as Company
              </NavLink>
            </li>

            <li className='flex items-center'>
              <NavLink
                className='hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs font-bold'
                to='/ReviewerSignup'
              >
                Sign up as Reviewer
              </NavLink>
            </li>
            <li className='flex items-center'>
              <NavLink
                className='hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs font-bold'
                to='/SignIn'
              >
                Sign In
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavbarHome;
