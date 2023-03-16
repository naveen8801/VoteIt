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
import { useDispatch } from 'react-redux';
import { getUser, setMainLoading } from './action/index';
import { useEffect } from 'react';
import { connect } from 'react-redux';

function App({ user, isLogin, mainLoading }) {
  const dispatch = useDispatch();
  console.log(isLogin);
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
      {mainLoading ? (
        <div className="loading-banner">
          <h1>Loading...</h1>{' '}
        </div>
      ) : (
        <>
          <NavBar />
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

const mapStateToProps = (state) => {
  return {
    user: state?.user,
    isLogin: state?.isLogin,
    mainLoading: state?.mainLoading,
  };
};

export default connect(mapStateToProps)(App);
