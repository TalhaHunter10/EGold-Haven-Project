
import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './components/login/login';
import Forum from './components/forum/forum';
import About from './components/about/about';
import Landing from './components/landing/landing';
import Signup from './components/signup/signup';
import ForgotPassword from './components/forgotpassword/forgotpassword';
import Signupjeweler from './components/signupjeweler/signupjeweler';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className="upperbody">
        <div className="containermainbody">
          <Header />
          
          <Routes>
              <Route path="" element={<Landing />} />
              <Route path="/App.jsx" element={<Landing />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/forum" element={<Forum/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/forgotpassword" element={<ForgotPassword/>} />
              <Route path="/signupjeweler" element={<Signupjeweler/>} />
          </Routes>

        </div>
      </div>
      <div className="lowerbody">
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
