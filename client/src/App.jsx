import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store';
import Home from './views/Home';
import './assets/styles/app.css';
import ReviewerSignup from './views/auth/ReviewerSignup';
import CompanySignup from './views/auth/CompanySignup';
import SignIn from './views/auth/SignIn';
import Alert from './components/layouts/Alert';
const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/ReviewerSignup' element={<ReviewerSignup />} />
          <Route path='/CompanySignup' element={<CompanySignup />} />
          <Route path='/SignIn' element={<SignIn />} />
        </Routes>
      </Provider>
    </>
  );
};
export default App;
