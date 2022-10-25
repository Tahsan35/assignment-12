import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Pages/Login/Signup';
import Navbar from './Pages/Shared/Navbar';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import NotFound from './Pages/Shared/NotFound';
import Cart from './Pages/DashBoard/Card/Card';
import MyPortFolio from './Pages/MyPortFolio/MyPortFolio';
function App() {
  return (
    <div className="bg-white">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/home' element={<Home />} ></Route>
        <Route path='/cart' element={<Cart />} ></Route>
        <Route path='/signup' element={<Signup />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/portfolio' element={<MyPortFolio />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
