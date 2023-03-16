import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/SignIn';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import AboutUs from './pages/AboutUs';
import SignUp from './pages/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setMainLoading } from './action/index';
import { useEffect } from 'react';
import loadingVector from './assets/loading-vector.svg';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  useEffect(() => {
    dispatch(setMainLoading(true));
    async function doVerifyUser() {
      dispatch(getUser());
    }
    doVerifyUser();
  }, []);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <NavBar />
      {state?.mainLoading ? (
        <div className="loading-banner">
          <h1>Loading...</h1>{' '}
        </div>
      ) : (
        <>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about-us" element={<AboutUs />} />
            <Route exact path="/sign-in" element={<Login />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/contact-us" element={<ContactUs />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
