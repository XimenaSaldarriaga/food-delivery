import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/home/Home';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import { AuthProvider } from '../context/authContext';
import Search from '../components/search/Search';
import Orders from '../components/orders/Orders';
import Profile from '../components/profile/Profile';
import ProfileEdit from '../components/profileEdit/ProfileEdit';
import Restaurant from '../components/restaurant/Restaurant';
import Product from '../components/product/Product';
import Order from '../components/order/Order';
import Payment from '../components/payment/Payment';
import AddCard from '../components/addCard/AddCard';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRouter from './PrivateRouter.jsx';
import History from '../components/history/History'
import Current from '../components/current/Current'

const Router = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
    useEffect(() => {
      localStorage.setItem('authenticated', isAuthenticated);
    }, [isAuthenticated]);

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRouter isAuthenticated={isAuthenticated} />}>
                        <Route path="/home" element={<Home  />} />
                        <Route path="/search" element={<Search  />} />
                        <Route path="/orders" element={<Orders  />} />
                        <Route path="/profile" element={<Profile  />} />
                        <Route path="/profile-edit" element={<ProfileEdit  />} />
                        <Route path="/restaurant/:id" element={<Restaurant  />} />
                        <Route path="/product" element={<Product  />} />
                        <Route path="/order" element={<Order  />} />
                        <Route path="/payment" element={<Payment  />} />
                        <Route path="/card" element={<AddCard  />} />
                        <Route path="/history/:orderId" element={<History />} />
                        <Route path="/current" element={<Current/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default Router;