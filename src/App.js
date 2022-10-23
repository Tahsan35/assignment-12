
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './Pages/Login/Signup';
import Navbar from './Pages/Shared/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login/Login';
import Footer from './Pages/Shared/Footer';

function App() {
  return (
    <div className="bg-white">
      <Navbar />
      <Routes>
        <Route path='/signup' element={<Signup />} ></Route>
        <Route path='/login' element={<Login />} ></Route>

      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
