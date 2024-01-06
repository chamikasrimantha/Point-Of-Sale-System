import axios from 'axios';
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const CustomerProtectedRoutes = () => {

    
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    if (!token) {
        navigate("/login");
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return <Outlet/>

}

export default CustomerProtectedRoutes;