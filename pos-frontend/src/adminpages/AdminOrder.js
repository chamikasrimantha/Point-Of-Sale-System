import React, { useEffect, useState } from 'react'
import AdminNavBar from './components/AdminNavBar'
import './Admin.css'
import axios from 'axios';

export default function AdminOrder() {

  const [checkouts, setCheckouts] = useState(null);

  useEffect(() => {
    getCheckouts();
  }, []);

  const getCheckouts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/checkouts");
      setCheckouts(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/admin/login");
      }
    }
  }

  const deleteCheckout = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/checkouts/${id}`);
      const updatedCheckouts = checkouts.filter((checkout) => checkout.id !== id);
      setCheckouts(updatedCheckouts);
    } catch (error) {
      // Handle error appropriately
      console.error("Error deleting checkout:", error);
    }
  }

  return (
    <div>
      <AdminNavBar />
      <br/>
      <h2>All Checkouts</h2>
      <br/>
      {checkouts && checkouts.length > 0 && (
        <table className="category-table">
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '50%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>ID</th>
              <th style={{ textAlign: 'center' }}>Total</th>
              <th style={{ textAlign: 'center' }}>Time</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {checkouts.map((checkout) => (
              <tr key={checkout.id}>
                <td>{checkout.id}</td>
                <td>
                  {checkout.total}
                </td>
                <td>
                  {checkout.orderTime}
                </td>
                <td>
                  <button onClick={() => deleteCheckout(checkout.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}