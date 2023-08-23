import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/home/home';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import { AuthProvider } from '../context/AuthContext';
import Check from '../components/check/Check';

const Router = () => {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/check" element={<Check />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    )
}

export default Router