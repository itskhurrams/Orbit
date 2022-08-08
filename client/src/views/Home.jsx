import FooterDesktop from '../components/footers/FooterDesktop';
import pattrenImage from '../assets/images/pattern_react.png';
import Navbar from '../components/navbars/Navbar';
import { NavLink } from 'react-router-dom';

const Home = () => (
  <>
    <Navbar fixed />
    <section className='header relative pt-16 items-center flex h-screen max-h-860-px'>
      <div className='container mx-auto items-center flex flex-wrap mt-24 md:mt-16 mb-24 md:mb-16'>
        <div className='w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4'>
          <div className='pt-32 sm:pt-0'>
            <h2 className='font-semibold text-4xl text-blueGray-600'>
              How was your last employer ?
            </h2>
            <p className='mt-4 text-lg leading-relaxed text-blueGray-500'>
              You can save people from burnout with toxic culture companies by
              sharing your experience with your employers.
            </p>
            <div className='mt-12'>
              <NavLink
                className='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                to='/ReviewerSignup'
              >
                Sign up as Reviewer
              </NavLink>
              <NavLink
                className='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                to='/CompanySignup'
              >
                Sign up as Company
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <img
        className='absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px'
        src={pattrenImage}
        alt='...'
      />
    </section>
    <FooterDesktop />
  </>
);
export default Home;
