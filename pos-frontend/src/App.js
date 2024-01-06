import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './adminpages/AdminHome';
import AdminCategory from './adminpages/AdminCategory';
import AdminItem from './adminpages/AdminItem';
import AdminStock from './adminpages/AdminStock';
import AdminCustomer from './adminpages/AdminCustomer';
import AdminOrder from './adminpages/AdminOrder';
import AdminLogin from './adminpages/Auth/AdminLogin';
import AdminRegister from './adminpages/Auth/AdminRegister';
import Home from './customerpages/Home';
import Login from './customerpages/Auth/Login';
import Register from './customerpages/Auth/Register';
import CustomerProtectedRoutes from './utils/CustomerProtectedRoutes';
import AdminProtectedRoutes from './utils/AdminProtectedRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/register' element={<AdminRegister />} />

          <Route element={<AdminProtectedRoutes />}>
            <Route path='/admin' element={<AdminHome />} />
            <Route path='/admin/categories' element={<AdminCategory />} />
            <Route path='/admin/items' element={<AdminItem />} />
            <Route path='/admin/stocks' element={<AdminStock />} />
            <Route path='/admin/orders' element={<AdminOrder />} />
            <Route path='/admin/customers' element={<AdminCustomer />} />
          </Route>
          
          <Route element={<CustomerProtectedRoutes />}>
            <Route path='/' element={<Home />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
