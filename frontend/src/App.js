import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/SignIn';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import AboutUs from './pages/AboutUs';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
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
