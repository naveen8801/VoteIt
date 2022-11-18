import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/contact-us" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;
