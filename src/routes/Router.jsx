import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/home/Home';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import { AuthProvider } from '../context/AuthContext';
import Check from '../components/check/Check';
import Search from '../components/search/Search';
import Orders from '../components/orders/Orders';
import Profile from '../components/profile/Profile';
import ProfileEdit from '../components/profileEdit/ProfileEdit';
import Restaurant from '../components/restaurant/Restaurant';
import Product from '../components/product/Product';
import Order from '../components/order/Order';
import Payment from '../components/payment/Payment';
import AddCard from '../components/addCard/AddCard';
import PrivateRouter from './PrivateRouter.jsx';

const Router = () => {

    const userAuthentication = (localStorage.getItem("authenticated")) || false;
    const [isAuthenticated, setIsAuthenticated] = useState(userAuthentication);
    
    useEffect(() => {
        localStorage.setItem("authenticated", isAuthenticated.toString());
    }, [isAuthenticated]);

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRouter isAuthenticated={isAuthenticated} />}>
                        <Route path="/home" element={<Home  />} />
                        <Route path="/check" element={<Check  />} />
                        <Route path="/search" element={<Search  />} />
                        <Route path="/orders" element={<Orders  />} />
                        <Route path="/profile" element={<Profile  />} />
                        <Route path="/profile-edit" element={<ProfileEdit  />} />
                        <Route path="/restaurant/:id" element={<Restaurant  />} />
                        <Route path="/product" element={<Product  />} />
                        <Route path="/order" element={<Order  />} />
                        <Route path="/payment" element={<Payment  />} />
                        <Route path="/card" element={<AddCard  />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default Router