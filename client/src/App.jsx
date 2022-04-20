import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import './assets/styles/app.css';
const App = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
    </>
  );
};
export default App;
