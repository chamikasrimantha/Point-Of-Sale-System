import axios from 'axios';
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const AdminProtectedRoutes = () => {

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    if (!token) {
        navigate("/admin/login");
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return <Outlet/>
}

export default AdminProtectedRoutes;