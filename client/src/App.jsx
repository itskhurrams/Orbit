import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import './assets/styles/app.css';
import ReviewerSignup from './views/auth/ReviewerSignup';
import CompanySignup from './views/auth/CompanySignup';
import SignIn from './views/auth/SignIn';
const App = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/ReviewerSignup' element={<ReviewerSignup />} />
        <Route path='/CompanySignup' element={<CompanySignup />} />
        <Route path='/SignIn' element={<SignIn />} />
      </Routes>
    </>
  );
};
export default App;
