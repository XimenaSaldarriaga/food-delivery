import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/home/home';
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

const Router = () => {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/check" element={<Check />} />
                <Route path="/search" element={<Search />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile-edit" element={<ProfileEdit />} />
                <Route path="/restaurant" element={<Restaurant />} />
                <Route path="/product" element={<Product />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    )
}

export default Router