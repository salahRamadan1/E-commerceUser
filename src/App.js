import './App.css';
 
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/authComponents/Register';
import LogIn from './components/authComponents/login';
import NavBar from './components/navbar/NavBar';
import CheckEmail from './components/authComponents/checkEmail';
import Digit from './components/authComponents/digit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from './service/auth/authSlice';
import Profile from './components/SettingsComponents/Profile';
import MainHome from './components/homeComponents/MainHome';
import ProductDetails from './components/productComponents/ProductDetails';
import ResetPassWord from './components/authComponents/ResetPassWord';
import NavSub from './components/navBarTwo/NavSub';
import PoductSpecificCategory from './components/productComponents/PoductSpecificCategory';
import WashList from './components/washlist/WashList';
import Cart from './components/cart/Cart';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logIn())
  }, [])

  return (
    <div>
      <NavBar />
 
      <div className=' container mt-5 pt-5'>
        <Routes >
          <Route path='/' element={<MainHome />} />
          <Route path='home' element={<MainHome />} />
          <Route path='WashList' element={<WashList />} />
          <Route path='cart' element={<Cart />} />
          {/* auth component  */}
          <Route path='login' element={<LogIn />} />
          <Route path='register' element={<Register />} />
          <Route path='checkemail' element={<CheckEmail />} />
          <Route path='digit' element={< Digit />} />
          <Route path='ResetPassWord' element={< ResetPassWord />} />

          <Route path='productDetails/:id' element={<ProductDetails />} />
          <Route path='PoductSpecificCategory/:id' element={<PoductSpecificCategory />} />
          {/* settingcomponint */}
          <Route path='profile' element={< Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
