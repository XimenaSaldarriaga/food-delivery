import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/home/home';
import Login from '../components/login/Login';
import Register from '../components/register/Register';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router