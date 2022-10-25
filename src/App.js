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
import Checkout from './Pages/Checkout';
import RequireAuth from './Pages/Login/RequireAuth';
import Purchase from './Pages/Purchase/Purchase';
import Dashboard from './Pages/DashBoard/Dashboard';
import MyProfile from './Pages/DashBoard/MyProfile';
import MyOrders from './Pages/DashBoard/MyOrders';
import AddReview from './Pages/DashBoard/AddReview';
import Payment from './Pages/DashBoard/Payment';
import MakeAdmin from './Pages/DashBoard/Admin/MakeAdmin';
import ManageParts from './Pages/DashBoard/Admin/ManageParts';
import AddParts from './Pages/DashBoard/Admin/AddParts';
import ManageAllPurchase from './Pages/DashBoard/Admin/ManageAllPurchase';

function App() {
  return (
    <div className="bg-white">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/home' element={<Home />} ></Route>
        <Route path='/cart' element={<Cart />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/portfolio' element={<MyPortFolio />}></Route>
        <Route path='/signup' element={<Signup />} ></Route>
        <Route path='/checkout' element={<Checkout />} ></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth><Purchase />
          </RequireAuth>
        }>
        </Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route index element={<MyProfile />}></Route>
          <Route path='myOrders' element={<MyOrders />}></Route>
          <Route path='addReview' element={<AddReview />}></Route>
          <Route path='payment/:id' element={<Payment />}></Route>
          <Route path='makeAdmin' element={<MakeAdmin />}></Route>
          <Route path='manageParts' element={<ManageParts />}></Route>
          <Route path='allPurchase' element={<ManageAllPurchase />}></Route>
          <Route path='addParts' element={<AddParts />}></Route>
        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
