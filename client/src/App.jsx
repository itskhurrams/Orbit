import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store';
import { useEffect } from 'react';
import Home from './views/Home';
import './assets/styles/app.css';
import ReviewerSignup from './views/auth/ReviewerSignup';
import CompanySignup from './views/auth/CompanySignup';
import SignIn from './views/auth/SignIn';
import { loadUser } from './redux/authAction';
import setAuthToken from './helpers/setAuthToken';
import Dashboard from './views/dashboard/Dashboard';
import Navbar from './components/navbars/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/ReviewerSignup' element={<ReviewerSignup />} />
          <Route path='/CompanySignup' element={<CompanySignup />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
};
export default App;
