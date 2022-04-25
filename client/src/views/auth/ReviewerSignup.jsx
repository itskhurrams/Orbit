// @flow
import React, { useState } from 'react';
import axios from 'axios';
import FooterDesktop from '../../components/footers/FooterDesktop';
import NavbarPublic from '../../components/navbars/NavbarPublic';

const ReviewerSignup = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    passcode: '',
    confirmPasscode: '',
    isCompany: false,
    location: '',
    iAgree: false,
    // location: {
    //   address: '',
    //   city: '',
    //   state: '',
    //   postcode: '',
    //   country: '',
    // },
  });
  const {
    firstName,
    lastName,
    title,
    email,
    passcode,
    confirmPasscode,
    location,
    isCompany,
    iAgree,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (passcode !== confirmPasscode) {
      console.log('Password does not match.');
    } else {
      console.log(formData);
      const newUser = {
        firstName,
        lastName,
        title,
        email,
        passcode,
        location,
        isCompany,
      };
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          baseURL: 'http://localhost:5000',
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post('/api/users/signup', body, config);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <NavbarPublic />
      <div className='mx-auto px-4 h-full mt-24 md:mt-16 mb-24 md:mb-16'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
              <div className='rounded-t mb-0 px-6 py-6'>
                <div className='text-center mb-3'>
                  <h6 className='text-blueGray-500 text-xl font-bold'>
                    Sign up as reviewer
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
                </div>
                <hr className='mt-6 border-b-1 border-blueGray-300' /> */}
              </div>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                {/* <div className='text-blueGray-400 text-center mb-3 font-bold'>
                  <p>Or sign up with credentials</p>
                </div> */}
                <form className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='flex flex-wrap mb-3'>
                    <div className='w-full pr-4 pl-0 flex-1'>
                      <label
                        className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                        htmlFor='firstName'
                      >
                        First Name *
                      </label>
                      <input
                        name='firstName'
                        type='text'
                        className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                    <div className='w-full pl-4 pr-0 flex-1'>
                      <label
                        className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                        htmlFor='lastName'
                      >
                        Last Name *
                      </label>
                      <input
                        name='lastName'
                        type='text'
                        className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className='relative w-full mb-3 '>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='title'
                    >
                      Title *
                    </label>
                    <input
                      name='title'
                      type='text'
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Title / Designation'
                      value={title}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='email'
                    >
                      Email *
                    </label>
                    <input
                      name='email'
                      type='email'
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Email'
                      value={email}
                      onChange={(e) => onChange(e)}
                      required
                    />
                    <small>
                      This site uses Gravatar so if you want a profile image,
                      use a Gravatar email.
                    </small>
                  </div>
                  <div className='flex flex-wrap mb-3'>
                    <div className='w-full pr-4 pl-0 flex-1'>
                      <label
                        className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                        htmlFor='passcode'
                      >
                        Password *
                      </label>
                      <input
                        name='passcode'
                        type='password'
                        minLength='6'
                        className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        placeholder='Password'
                        value={passcode}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                    <div className='w-full pl-4 pr-0 flex-1'>
                      <label
                        className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                        htmlFor='confirmPasscode'
                      >
                        Confirm Password *
                      </label>
                      <input
                        name='confirmPasscode'
                        type='password'
                        minLength='6'
                        className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        placeholder='Confirm Password'
                        value={confirmPasscode}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className='relative w-full mb-3 '>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='location'
                    >
                      Location
                    </label>
                    <input
                      name='location'
                      type='text'
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Location'
                      value={location}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div>
                    <label className='inline-flex items-center cursor-pointer'>
                      <input
                        name='iAgree'
                        type='checkbox'
                        value={iAgree}
                        onChange={(e) => onChange(e)}
                        className='form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
                      />
                      <span className='ml-2 text-sm font-semibold text-blueGray-600'>
                        I agree with the{' '}
                        <a
                          href='#pablo'
                          className='text-lightBlue-500'
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                  <div className='text-center mt-6'>
                    <button
                      className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                      type='submit'
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterDesktop />
    </>
  );
};

export default ReviewerSignup;
