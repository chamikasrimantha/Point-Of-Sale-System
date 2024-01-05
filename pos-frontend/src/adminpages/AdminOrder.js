import React, { useEffect, useState } from 'react'
import AdminNavBar from './components/AdminNavBar'
import axios from 'axios';

export default function AdminOrder() {

  const [checkouts, setCheckouts] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/checkouts");
      setCheckouts(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/admin/login");
      }
    }
  }

  return (
    <div>
      <AdminNavBar />

    </div>
  )
}