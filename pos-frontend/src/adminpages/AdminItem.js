import React, { useEffect, useState } from 'react'
import AdminNavBar from './components/AdminNavBar'
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminItem() {

  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [stockId, setStockId] = useState(null);
  const [editItemId, setEditItemId] = useState('');

  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState(null);
  const [stocks, setStocks] = useState(null);

  useEffect(() => {
    getCategories();
    getStocks();
    getItems();
  }, [])

  const navigate = useNavigate();

  const createItem = async () => {
    const data = {
      "name": name,
      "price": price,
      "categoryId": categoryId,
      "stockId": stockId
    }
    try {
      const response = await axios.post("http://localhost:8080/items", data);
      setItems(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/admin/login");
      }
    }
  }

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      setCategories(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/admin/login");
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

  const getItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/items");
      setItems(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/admin/login");
      }
    }
  }

  const handleEdit = (itemId) => {
    setEditItemId(itemId);
  };

  const handleConfirm = async (itemId, updatedName, updatedPrice) => {
    await updateItem(itemId, updatedName, updatedPrice);
    setEditItemId(null);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/items/${itemId}`);
      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  const updateItem = async (itemId, updatedName, updatedPrice) => {
    try {
      const response = await axios.put(`http://localhost:8080/items/${itemId}`, {
        name: updatedName,
        price: updatedPrice
      });
      const updatedItems = items.map((item) =>
        item.id === itemId ? { ...item, name: updatedName, price: updatedPrice } : item
      );
      setItems(updatedItems);
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div className="form-container">
        <form onSubmit={createItem}>
          <h2>Create a new Item</h2>
          <label htmlFor="itemName">Item Name:</label>
          <input type="text" id="itemName" onChange={(e) => { setName(e.target.value) }} required />
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" onChange={(e) => { setPrice(e.target.value) }} required />
          <label htmlFor="categoryId">Category ID:</label>
          <select id="categoryId" onChange={(e) => { setCategoryId(e.target.value) }} required>
            <option>Please select an option</option>
            {categories && categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <label htmlFor="stockId">Stock ID:</label>
          <select id="stockId" onChange={(e) => { setStockId(e.target.value) }} required>
            <option>Please select an option</option>
            {stocks && stocks.map((stock) => (
              <option key={stock.id} value={stock.id}>{stock.name}</option>
            ))}
          </select>
          <button type="submit">Create Item</button>
        </form>
      </div>
      <br></br>
      {items && items.length > 0 && (
        <table className="category-table">
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {editItemId === item.id ? (
                    <input
                      className="edit-input"
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        const updatedName = e.target.value;
                        updateItem(item.id, updatedName, item.price);
                      }}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editItemId === item.id ? (
                    <input
                      className="edit-input"
                      type="text"
                      value={item.price}
                      onChange={(e) => {
                        const updatedPrice = e.target.value;
                        updateItem(item.id, item.name, updatedPrice);
                      }}
                    />
                  ) : (
                    item.price
                  )}
                </td>
                <td>
                  {editItemId === item.id ? (
                    <button className="confirm-btn" onClick={() => handleConfirm(item.id, item.name, item.price)}>
                      Confirm
                    </button>
                  ) : (
                    <button className="update-btn" onClick={() => handleEdit(item.id)}>Update</button>
                  )}
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
