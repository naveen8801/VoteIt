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
import { getUser } from './action/index';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  console.log(user);
  useEffect(() => {
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
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about-us" element={<AboutUs />} />
        <Route exact path="/sign-in" element={<Login />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/contact-us" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;
