import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { } from "./assets/css/style.css";
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
// import Home from './pages/Home';
const Home = React.lazy(() => import('./pages/Home'))
const Shop = React.lazy(() => import('./pages/Shop/Shop'))
// import Shop from './pages/Shop/Shop';
import Contact from './pages/Contact';
import Detail from './pages/Detail';
import MainLayout from './layouts/MainLayout';
import SideLayout from './layouts/SideLayout';
import { Suspense } from 'react';
import Cart from './pages/Cart';
import LinearProgress from './partials/LinearProgress';
import Login from './auth/Login';
import Register from './auth/Register';
import Profile from './auth/Profile/Profile';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route element={<MainLayout />} >
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/home' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/detail/:id' element={<Detail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/checkout-success' element={<CheckoutSuccess />} />
              <Route path='/profile' element={<Profile tab='profile' />} />
              <Route path='/orders-history' element={<Profile tab='order' />} />
              <Route path='/contact' element={<Contact />} />
            </Route>
            <Route element={<SideLayout />} >

              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
