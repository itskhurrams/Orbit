// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { setAlert } from '../../redux/alertAction';
import { login } from '../../redux/authAction';
import FooterDesktop from '../../components/footers/FooterDesktop';
import NavbarPublic from '../../components/navbars/NavbarPublic';
import Alert from '../../components/layouts/Alert';

const SignIn = ({ setAlert, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    passcode: '',
  });
  const { email, passcode } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === '') setAlert('Email Address is required.', 'red', 3000);
    if (passcode === '') setAlert('Password is required.', 'red', 5000);
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setAlert('Enter valid Email Address.', 'red', 5000);
      return;
    } else {
      login(email, passcode);
    }
  };
  return (
    <>
      <NavbarPublic />
      <div className='mx-auto px-4 h-full mt-24 md:mt-16 mb-24 md:mb-16'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-4/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
              <div className='rounded-t mb-0 px-6 py-6'>
                <div className='text-center mb-3'>
                  <h6 className='text-blueGray-500 text-sm font-bold'>
                    Sign In
                  </h6>
                </div>
                {/* <div className='btn-wrapper text-center'>
                  <button
                    className='bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150'
                    type='button'
                  >
                    <i className='fab fa-facebook-square text-5xl'></i>
                  </button>
                  <button
                    className='bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150'
                    type='button'
                  >
                    <i className='fa-brands fa-google text-5xl'></i>
                  </button>
                </div> */}
                <hr className='mt-6 border-b-1 border-blueGray-300' />
              </div>
              <div className='flex-auto px-4 lg:px-6 py-10 pt-0'>
                <Alert />
              </div>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                {/* <div className='text-blueGray-400 text-center mb-3 font-bold'>
                  <small>Or sign in with credentials</small>
                </div> */}
                <form className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Email *
                    </label>
                    <input
                      name='email'
                      type='text'
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Email'
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Password *
                    </label>
                    <input
                      name='passcode'
                      type='password'
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Password'
                      value={passcode}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  {/* <div>
                    <label className='inline-flex items-center cursor-pointer'>
                      <input
                        id='customCheckLogin'
                        type='checkbox'
                        className='form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
                      />
                      <span className='ml-2 text-sm font-semibold text-blueGray-600'>
                        Remember me
                      </span>
                    </label>
                  </div> */}

                  <div className='text-center mt-6'>
                    <button
                      className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                      type='submit'
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className='flex flex-wrap mt-6 relative'>
              <div className='w-1/2'>
                <a
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                  className='text-blueGray-200'
                >
                  <small className='ml-2 text-sm font-semibold text-blueGray-600'>
                    Forgot password?
                  </small>
                </a>
              </div>
              <div className='w-1/2 text-right'>
                <Link to='/auth/register' className='text-blueGray-200'>
                  <small className='ml-2 text-sm font-semibold text-blueGray-600'>
                    Create new account
                  </small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterDesktop />
    </>
  );
};

SignIn.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};
export default connect(null, { setAlert, login })(SignIn);
