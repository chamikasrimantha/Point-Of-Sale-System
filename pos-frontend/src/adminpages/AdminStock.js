import React, { useEffect, useState } from 'react'
import AdminNavBar from './components/AdminNavBar'
import axios from 'axios';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

export default function AdminStock() {

  const [name, setName] = useState(null);
  const [qty, setQty] = useState(null);
  const [stocks, setStocks] = useState(null);
  const [editStockId, setEditStockId] = useState(null);

  useEffect(() => {
    getStocks();
  }, [])

  const navigate = useNavigate();

  const createStock = async () => {
    const data = {
      "name": name,
      "qty": qty
    }
    try {
      const response = await axios.post("http://localhost:8080/stocks", data);
      setStocks(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/admin/stocks");
      }
    }
  }

  const getStocks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/stocks");
      setStocks(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/admin/login");
      }
    }
  }

  const handleEdit = (stockId) => {
    setEditStockId(stockId);
  };

  const handleConfirm = async (stockId, updatedName, updatedQty) => {
    await updateStock(stockId, updatedName, updatedQty);
    setEditStockId(null);
  };

  const handleDelete = async (stockId) => {
    try {
      await axios.delete(`http://localhost:8080/stocks/${stockId}`);
      const updatedStocks = stocks.filter((stock) => stock.id !== stockId);
      setStocks(updatedStocks);
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  const updateStock = async (stockId, updatedName, updatedQty) => {
    try {
      const response = await axios.put(`http://localhost:8080/stocks/${stockId}`, {
        name: updatedName,
        qty: updatedQty
      });
      const updatedStocks = stocks.map((stock) =>
        stock.id === stockId ? { ...stock, name: updatedName, qty: updatedQty } : stock
      );
      setStocks(updatedStocks);
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div className="admin-category-container">
        <form onSubmit={createStock}>
          <h2>Create a new Stock</h2>
          <label htmlFor="categoryName">Stock Name:</label>
          <input type="text" onChange={(e) => { setName(e.target.value) }} required />
          <label htmlFor="categoryName">Qty:</label>
          <input type="text" onChange={(e) => { setQty(e.target.value) }} required />

          <button type="submit">Create Stock</button>
        </form>
      </div>
      {stocks && stocks.length > 0 && (
          <table className="category-table">
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '50%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '30%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id}>
                  <td>{stock.id}</td>
                  <td>
                    {editStockId === stock.id ? (
                      <input
                        className="edit-input"
                        type="text"
                        value={stock.name}
                        onChange={(e) => {
                          const updatedName = e.target.value;
                          updateStock(stock.id, updatedName, stock.qty);
                        }}
                      />
                    ) : (
                      stock.name
                    )}
                  </td>
                  <td>
                    {editStockId === stock.id ? (
                      <input
                        className="edit-input"
                        type="text"
                        value={stock.qty}
                        onChange={(e) => {
                          const updatedQty = e.target.value;
                          updateStock(stock.id, stock.name, updatedQty);
                        }}
                      />
                    ) : (
                      stock.qty
                    )}
                  </td>
                  <td>
                    {editStockId === stock.id ? (
                      <button className="confirm-btn" onClick={() => handleConfirm(stock.id, stock.name, stock.qty)}>
                        Confirm
                      </button>
                    ) : (
                      <button className="update-btn" onClick={() => handleEdit(stock.id)}>Update</button>
                    )}
                    <button className="delete-btn" onClick={() => handleDelete(stock.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      )}

    </div>
  )
}