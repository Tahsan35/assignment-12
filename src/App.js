
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './Pages/Login/Signup';
import Navbar from './Pages/Shared/Navbar';

function App() {
  return (
    <div className="bg-white">
      <Navbar />
      <Routes>
        <Route path='/signup' element={<Signup />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
