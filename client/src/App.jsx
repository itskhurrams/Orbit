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
        <Route exact path='/ReviewerSignup' element={<ReviewerSignup />} />
        <Route exact path='/CompanySignup' element={<CompanySignup />} />
        <Route exact path='/SignIn' element={<SignIn />} />
      </Routes>
    </>
  );
};
export default App;
